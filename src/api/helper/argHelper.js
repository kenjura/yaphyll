const _       = require('lodash');

module.exports = { getArgs, parseFilter };

// getArgs: given a list of parsed query params, converts to necessary sql
function getArgs(args={}, options) {
    const RESERVED_ARGS = [ 'sort', 'limit', 'offset', 'fields', 'q' ];

    const {
        sort = '',
        limit = '',
        offset = '',
        fields = '',
        q = '',
    } = args;
debugger;
    // sort
    // const sort = args.sort ? args.sort.replace(/,/g,' ') : { _id:1 };
    // if (args.q) sort.score = { $meta:'textScore' };
    const sortEnabled = sort !== '';
    const sortVal = sort
        .split(',')
        .filter(Boolean)
        .map(field => {
            const dir = field.substr(0,1) === '-' ? 'DESC' : 'ASC';
            const fieldName = field.replace(/^[-+]/, '');
            return `${fieldName} ${dir}`;
        })
            // .replace(/([+-])?(.*?)/, (em, dir, fieldName) => `${fieldName} ${dir === '-' ? 'DESC' : 'ASC'}`)
        .join(', ');
    const sortSql = sortVal.length ? 'ORDER BY ?' : '';


    // limit
    const limitEnabled = limit !== '';
    const limitSql = limit !== '' ? 'LIMIT ?' : '';
    const limitVal = limit;

    // offset
    const offsetEnabled = offset !== '';
    const offsetSql = offset !== '' ? 'OFFSET ?' : ''
    const offsetVal = offset;

    // fields
    // // const select = args.fields ? args.fields.replace(/,/g,' ') : '';
    // const fields = (args.fields||'').split(',').filter(f=>f);
    // const select = _.zipObject(fields, fields.map(()=>1));
    // if (args.q) select.score = { $meta:'textScore' };
    console.warn('argHelper > projection not implemented!');

    // filters
    const where = Object.entries(args)
        .filter(([ key, val ]) => !RESERVED_ARGS.includes(key))
        .map(([ key, val ]) => parseFilter(key, val));
    const whereSql = where.length === 0 ? '' : `WHERE ${where.map(w => w.sql).flat().join(' AND ')}`;
    const whereVal = where.map(w => w.val).flat();
    const whereEnabled = !!where.length;

    // full text
    console.warn('argHelper > full text not implemented!');
    // if (args.q) {
    //     filters.$or = [
    //         { $text: { $search: args.q }},
    //         { name: { $regex:new RegExp(args.q, 'gi') }}
    //     ];
    // }

    let sqlArr = [];
    if (whereEnabled) sqlArr.push(whereSql);
    if (sortEnabled) sqlArr.push(sortSql);
    if (limitEnabled) sqlArr.push(limitSql);
    if (offsetEnabled) sqlArr.push(offsetSql);
    const sql = sqlArr.join('\n');

    let val = [];
    if (whereEnabled) val.push(...whereVal);
    if (sortEnabled) val.push(sortVal);
    if (limitEnabled) val.push(limitVal);
    if (offsetEnabled) val.push(offsetVal);

    // const val = []
    //     .concat(whereVal, sortVal, limitVal, offsetVal)
    //     .filter(v => v !== '' && !isNaN(v));

    return { sql, val };
}
function parseFilter(key, dangerousValue) {
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

