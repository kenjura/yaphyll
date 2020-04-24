const { buildQuery, getWhere } = require('./queryBuilder');
const { getConnection } = require('./sqlConnection');

module.exports = { 
	createTable, 
	dropTable,
	find, 
	insert,
};

/*
exports:
 - primary
   - createTable: creates a table
   - find: retrieves data, returns array of rows
   - insert: inserts data, returns # of rows inserted
   - remove: deletes data, returns # of rows deleted
   - update: updates data, returns # of rows updated
 - aliases
   - findOne: alias for find, always returns a single row
   - findMany: alias for find, always returns an array
   - insertOne: alias for insert, expects a single object

*/

async function createTable({ dry=false, schema }) {
	const fields = schema.fields.map(getFieldSpec);
	const foreignKeys = schema.fields.filter(f => f.foreignKeyTable).map(getForeignKeySpec);
	const sql = `
		CREATE TABLE ${schema.tableName}(
			${fields.concat(foreignKeys).join(',\n')}
		);
	`;
	if (dry) return sql;
	else return await executeQuery(sql);

	function getFieldSpec(field) {
		let parts = [
			field.name,
			field.type,
			field.required || field.primaryKey ? 'not null' : '',
			field.autoIncrement ? 'auto_increment' : '',
			field.primaryKey ? 'primary key' : '',
			field.default ? `DEFAULT ${field.default}` : '',
		];
		let spec = parts.filter(Boolean).join(' ');
		return spec;
	}
	function getForeignKeySpec(field) {
		return `FOREIGN KEY (${field.name}) REFERENCES ${field.foreignKeyTable} (${field.foreignKeyField})`;
	}
}

async function dropTable({ confirm, schema }={}) {
	if (confirm !== schema.tableName) throw new Error('crud > dropTable > to call this function, you must pass a confirmation string.');
	const connection = await getConnection();
	return await connection.execute(`DROP TABLE IF EXISTS ${schema.tableName};`);
}

async function executeQuery(sql, val, rawRows=false) {
	const connection = await getConnection();
	const [ rows, fields ] = await connection.execute(sql, val);
	return rawRows ? raw(rows) : rows;	
}

async function find({ query, metadata=true, rawRows=false, schema }={}) {
	const { sql, val } = buildQuery({ query, schema });
	console.log({ sql, val });
	const rows = await executeQuery(sql, val, rawRows);

	// get metadata
	if (metadata) {
		const where = getWhere({ query });
		const mdSql = `SELECT count(*) count FROM ${schema.tableName} ${where.sql}`;
		const mdVal = where.val;
		const mdRows = await executeQuery(mdSql, mdVal);
		rows.filterCount = mdRows[0].count;
	}
	
	return rows;

}

async function insert({ rows=[], schema }) {
	const firstRow = rows[0];
	const fields = Object.keys(firstRow);
	fields.forEach(field => {
		if (!schema.fields.find(f => f.name === field)) throw new Error(`crud > insert > field "${field}" not found in schema!`);
	});
	const sql = `INSERT INTO ${schema.tableName}(${fields}) VALUES ?`;
	const val = getValues({ fields, rows });
	const connection = await getConnection();
	const result = await connection.query(sql, [val]);
	return result[0].affectedRows;

	function getValues({ fields, rows }) {
		return rows.map(row => fields.map(field => row[field]));
	}
}

function raw(rows) {
	return rows.map(row => JSON.parse(JSON.stringify(row)));
}