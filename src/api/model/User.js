const crud = require('../helper/crud');
const SqlString = require('sqlstring');

const { getConnection } = require('../helper/sqlConnection');
const { getWhere } = require('../helper/queryBuilder');

module.exports = { createTable, dropTable,  find, findOne, insert, remove, update };

const schema = {
	tableName: 'users',
	fields: [
		{ name:'username', type:'varchar(255)', required:true, primaryKey:true },
		{ name:'email', type:'varchar(255)', required:true },
		{ name:'createdAt', type:'timestamp', default:'CURRENT_TIMESTAMP' },
		{ name:'lastVisited', type:'timestamp' },
	],
};

async function createTable() {
	return await crud.createTable({ schema });
}
async function dropTable({ confirm }={}) {
	return await crud.dropTable({ confirm, schema });
}
async function find({ query }={}) {
	return await crud.find({ query, schema });
}
async function findOne({ query }={}) {
	return (await crud.find({ query, schema }))[0];
}
async function insert({ rows }={}) {
	return await crud.find({ rows, schema });
}

async function remove() {
	console.warn('User > remove > not implemented!');
}

async function update({ query, row }={}) {
	debugger;
	const where = getWhere({ query });
	const setFields = getSetFields(row);
	const sql = `
		UPDATE users
		SET ${setFields.sql}
		${where.sql}
	`;
	const val = [ ...setFields.val, ...where.val ];
	const connection = await getConnection();
	console.log({ where:'User > update', sql, val });
	const result = await connection.execute(sql, val);
	return result[0].affectedRows;

	function getSetFields(row) {
		const fields = Object.keys(row);
		const values = Object.values(row);
		return {
			sql: fields.map(f => `${f} = ?`).join(', '),
			val: values,
		}
	}
}