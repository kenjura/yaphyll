module.exports = { buildQuery, getSelect, getFrom, getWhere, getOrderBy, getLimit, getOffset, parseFilter };

const RESERVED_ARGS = [ 'sort', 'limit', 'offset', 'fields', 'q' ];

function buildQuery({ query={}, schema={} }={}) {
	const select = getSelect({ query });
	const from = getFrom({ query, schema });
	const where = getWhere({ query });
	const orderBy = getOrderBy({ query });
	const limit = getLimit({ query });
	const offset = getOffset({ query });

	let sqlArr = [];
	sqlArr.push(select.sql);
	sqlArr.push(from.sql);
	sqlArr.push(where.sql);
	sqlArr.push(orderBy.sql);
	sqlArr.push(limit.sql);
	sqlArr.push(offset.sql);
	const sql = sqlArr.filter(Boolean).join('\n');

	let val = [];
	val.push(...select.val);
	val.push(...from.val);
	val.push(...where.val);
	val.push(...orderBy.val);
	val.push(...limit.val);
	val.push(...offset.val);

	return { sql, val };
}
function getSelect({ query={} }={}) {
	if (!query.fields) return {
		sql: 'SELECT *',
		val: [],
	}

	return {
		sql: `SELECT ${query.fields.split(',').map(f=>`\`${removeTicks(f)}\``).join(',')}`,
		val: [],
	}
}
function getFrom({ query={}, schema={} }={}) {
	const { tableName } = schema;

	if (!tableName) throw new Error('queryBuilder > getFrom > cannot generate FROM statement as schema does not have a tableName!');

	return {
		sql: `FROM ${tableName}`,
		val: [],
	}
}
function getWhere({ query={} }={}) {	
    const filters = Object.entries(query)
        .filter(([ key, val ]) => !RESERVED_ARGS.includes(key))
        .map(([ key, val ]) => parseFilter(key, val));
    const sql = filters.length === 0 ? '' : `WHERE ${filters.map(w => w.sql).flat().join(' AND ')}`;
    const val = filters.map(w => w.val).flat();

    if (filters.length === 0) {
    	return {
    		sql: '',
    		val: [],
    	}
    }

    return { sql, val };
}
function getOrderBy({ query={} }={}) {
	if (!query.sort) return {
		sql: '',
		val: [],
	}

	// const val = query.sort
	const sorters = query.sort
        .split(',')
        .filter(Boolean)
        .map(field => {
        	if (field.includes("`")) {
        		console.warn('queryBuilder > getOrderBy > found a backtick in a sort clause. Nope.');
        		return '';
        	}
            const dir = field.substr(0,1) === '-' ? 'DESC' : 'ASC';
            const fieldName = field.replace(/^[-+]/, '');
            return `\`${fieldName}\` ${dir}`;
        })
        .join(', ');
    // const sql = val.length ? 'ORDER BY ?' : '';
    const sql = sorters.length ? `ORDER BY ${sorters}` : '';

    return { sql, val:[] };
}
function getLimit({ query={} }={}) {
	if (!query.limit) return {
		sql: '',
		val: [],
	};

	return {
		sql: 'LIMIT ?',
		val: [ query.limit ],
	}
	
}
function getOffset({ query={} }={}) {
	if (!query.offset) return {
		sql: '',
		val: [],
	};

	return {
		sql: 'OFFSET ?',
		val: [ query.offset ],
	}
}

function parseFilter(key, dangerousValue) {
    if (typeof dangerousValue !== 'string') throw new Error('argHelper > parseFilter > expected dangerousValue to be of type string, but was disappointed');
    let value = removeTicks(dangerousValue);

    // range
    if (value.indexOf('-')>-1) {
        return {
            sql: `${key} BETWEEN ? AND ?`,
            val: value.split('-'),
        }
    }

    // in
    if (value.indexOf(',')>-1) {
        return {
            // sql: `${key} IN (${value.split(',').map(v => '?').join(',')})`,
            sql: `${key} IN (?)`,
            val: [value.split(',').map(v => `'${removeTicks(v)}'`).join(',')],
        }
    }

    // regex
    // if (value.substr(0,1)=='/' && value.substr(-1,1)=='/') return new RegExp(value.substr(1, value.length-2));
    if (value.substr(0,1)=='/' && value.substr(-1,1)=='/') {
        throw new Error('argHelper > parseFilter > regex not supported yet!');
    }

    // literal
    return {
        sql: `${key} = ?`,
        val: [value]
    }
}


function removeTicks(val) {
    return val.replace(/'/g, "''");
}

