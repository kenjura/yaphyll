const { getArgs } = require('../helper/argHelper');
const { getConnection } = require('../helper/sqlConnection');

const crud = require('../helper/crud');

module.exports = { createTable, dropTable,  find, findOne, insert, remove, update };

const schema = {
	tableName: 'forums',
	fields: [
		{ name:'forumId', type:'int', required:true, autoIncrement:true, primaryKey:true },
		{ name:'createdBy', type:'varchar(255)', required:true, foreignKey:'createdBy', foreignKeyTable:'users', foreignKeyField:'username' },
		{ name:'title', type:'varchar(255)', required:true },
		{ name:'displayOrder', type:'int' },
		{ name:'parentForumId', type:'int' },
		{ name:'createdAt', type:'timestamp', default:'CURRENT_TIMESTAMP' },
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
	console.warn('Forum > remove > not implemented!');
}

async function update() {
	console.warn('Forum > update > not implemented!');
}