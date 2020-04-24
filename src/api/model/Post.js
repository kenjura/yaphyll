const debug = require('debug')('yaphyll:Post');

const { getArgs } = require('../helper/argHelper');
const { getConnection } = require('../helper/sqlConnection');

module.exports = { createTable, dropTable, create, createMany, find, findOne, remove, update };

async function createTable({ drop=false }={}) {
	const connection = await getConnection();
	if (drop) await connection.execute('DROP TABLE IF EXISTS posts;');
	const sql = `
		CREATE TABLE posts(
			postId int auto_increment primary key,
			threadId int not null,
			createdBy varchar(255) not null,
			body text,
    		createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (threadId)
				REFERENCES threads (threadId),
    		FOREIGN KEY (createdBy)
    			REFERENCES users (username)
		);
	`;
	const result = await connection.execute(sql);
	return result;
}
async function dropTable({ confirm }={}) {
	if (confirm !== 'posts') throw new Error('Post > dropTable > to call this function, you must pass a confirmation string.');
	const connection = await getConnection();
	return await connection.execute('DROP TABLE IF EXISTS posts;');
}

async function create({ threadId, createdBy, body }={}) {
	if (!threadId) throw new Error('Post > create > required field threadId is not present');
	if (!createdBy) throw new Error('Post > create > required field createdBy is not present');
	if (!body) throw new Error('Post > create > required field body is not present');
	const connection = await getConnection();
	const sql = `
		INSERT INTO posts(threadId, createdBy, body)
		VALUES(?, ?, ?);
	`;
	const values = [ threadId, createdBy, body ];
	const result = await connection.execute(sql, values);
	return result;
}

async function createMany(rows) {
	console.warn('Post > createMany > not currently validating input. Good luck!');
	const connection = await getConnection();
	const sql = `INSERT INTO posts(postId, threadId, createdBy, body, createdAt) VALUES ?`;
	const values = rows.map(row => [
		row.postId, row.threadId, row.createdBy, row.body, row.createdAt
	]);
	const result = await connection.query(sql, [values]);
	return result[0].affectedRows;
}

async function find(query={}) {
	console.warn('Post > find > not fully implemented!');
	const connection = await getConnection();
	const args = getArgs(query);
	const sql = `
		SELECT * FROM posts
		${args.sql};
	`;
	const values = args.val;
	console.log({ sql, values });
	const [ rows, fields ] = await connection.execute(sql, values);
	return rows;
}
async function findOne(query={}) {
	const rows = await find(query);
	if (!rows || !Array.isArray(rows)) throw new Error('Post > findOne > output not in expected format!');
	return rows[0];
}

async function remove() {
	console.warn('Post > remove > not implemented!');
}

async function update() {
	console.warn('Post > update > not implemented!');
}