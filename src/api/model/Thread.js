const { getArgs } = require('../helper/argHelper');
const { getConnection } = require('../helper/sqlConnection');

module.exports = { createTable, dropTable, create, createMany, find, findOne, remove, update };

async function createTable({ drop=false }={}) {
	const connection = await getConnection();
	const sql = `
		CREATE TABLE threads(
			threadId int auto_increment primary key,
			forumId int not null,
			createdBy varchar(255) not null,
			title varchar(255) not null,
    		createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			foreign key (forumId)
				references forums (forumId),
    		FOREIGN KEY (createdBy)
    			REFERENCES users (username)
		);
	`;
	const result = await connection.execute(sql);
	return result;
}
async function dropTable({ confirm }={}) {
	if (confirm !== 'threads') throw new Error('Thread > dropTable > to call this function, you must pass a confirmation string.');
	const connection = await getConnection();
	return await connection.execute('DROP TABLE IF EXISTS threads;');
}

async function create({ forumId, createdBy, title }={}) {
	if (!forumId) throw new Error('Thread > create > required field forumId is not present');
	if (!createdBy) throw new Error('Thread > create > required field createdBy is not present');
	if (!title) throw new Error('Thread > create > required field title is not present');
	const connection = await getConnection();
	const sql = `
		INSERT INTO threads(forumId, createdBy, title)
		VALUES(?, ?, ?);
	`;
	const values = [ forumId, createdBy, title ];
	const result = await connection.execute(sql, values);
	return result;
}

async function createMany(rows) {
	console.warn('Thread > createMany > not currently validating input. Good luck!');
	const connection = await getConnection();
	const sql = `INSERT INTO threads(threadId, forumId, createdBy, title, createdAt) VALUES ?`;
	const values = rows.map(row => [
		row.threadId, row.forumId, row.createdBy, row.title, row.createdAt
	]);
	const result = await connection.query(sql, [values]);
	return result[0].affectedRows;
}
async function find(query={}) {
	console.warn('Thread > find > not fully implemented!');
	const connection = await getConnection();
	const args = getArgs(query);
	const sql = `
		SELECT * FROM threads
		${args.sql};
	`;
	const values = args.val;
	console.log({ sql, values });
	const [ rows, fields ] = await connection.execute(sql, values);
	return rows;
}
async function findOne(query={}) {
	const rows = await find(query);
	if (!rows || !Array.isArray(rows)) throw new Error('Thread > findOne > output not in expected format!');
	return rows[0];
}

async function remove() {
	console.warn('Thread > remove > not implemented!');
}

async function update() {
	console.warn('Thread > update > not implemented!');
}