const { getConnection } = require('../helper/sqlConnection');

module.exports = { createTable, dropTable, create, find, remove, update };

async function createTable({ drop=false }={}) {
	const connection = await getConnection();
	const sql = `
		CREATE TABLE users(
			username varchar(255) primary key,
			email varchar(255) not null,
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`;
	const result = await connection.execute(sql);
	return result;
}
async function dropTable({ confirm }={}) {
	if (confirm !== 'users') throw new Error('User > dropTable > to call this function, you must pass a confirmation string.');
	const connection = await getConnection();
	return await connection.execute('DROP TABLE IF EXISTS users;');
}

async function create({ username, email }={}) {
	if (!username) throw new Error('User > create > required field username is not present');
	if (!email) throw new Error('User > create > required field email is not present');
	const connection = await getConnection();
	const sql = `
		INSERT INTO users(username, email)
		VALUES(?, ?);
	`;
	const values = [ username, email ];
	const result = await connection.execute(sql, values);
	return result;
}

async function find({ username }={}) {
	console.warn('User > find > not fully implemented!');
	const connection = await getConnection();
	const sql = `
		SELECT * FROM users
		WHERE username = ?;
	`;
	const values = [ username ];
	const result = await connection.execute(sql, values);
	return result;
}

async function remove() {
	console.warn('User > remove > not implemented!');
}

async function update() {
	console.warn('User > update > not implemented!');
}