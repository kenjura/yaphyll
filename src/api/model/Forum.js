const { getArgs } = require('../helper/argHelper');
const { getConnection } = require('../helper/sqlConnection');

module.exports = { createTable, dropTable, create, createMany, find, findOne, remove, update };

async function createTable({ drop=false }={}) {
	const connection = await getConnection();
	const sql = `
		CREATE TABLE forums(
			forumId int auto_increment primary key,
			createdBy varchar(255) not null,
			title varchar(255) not null,
			displayOrder int,
			parentForumId int,
    		createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP/*,
    		FOREIGN KEY (createdBy)
    			REFERENCES users (username)*/
		);
	`;
	const result = await connection.execute(sql);
	return result;
}
async function dropTable({ confirm }={}) {
	if (confirm !== 'forums') throw new Error('Forum > dropTable > to call this function, you must pass a confirmation string.');
	const connection = await getConnection();
	return await connection.execute('DROP TABLE IF EXISTS forums;');
}

async function create({ createdBy, title, displayOrder, parentForumId }={}) {
	if (!createdBy) throw new Error('Forum > create > required field createdBy is not present');
	if (!title) throw new Error('Forum > create > required field title is not present');
	const connection = await getConnection();
	const sql = `
		INSERT INTO forums(createdBy, title, displayOrder, parentForumId)
		VALUES(?, ?, ?, ?);
	`;
	const values = [ createdBy, title, displayOrder, parentForumId ];
	const result = await connection.execute(sql, values);
	return result;
}

async function createMany(rows, options={}) {
	console.warn('Forum > createMany > not currently validating input. Good luck!');
	const connection = await getConnection();
	const sql = `INSERT INTO forums(forumId, createdBy, title, displayOrder, parentForumId) VALUES ?`;
	const values = rows.map(row => [
		row.forumId, row.createdBy, row.title, row.displayOrder, row.parentForumId
	]);
	const result = await connection.query(sql, [values]);
	return result[0].affectedRows;
}

async function find(query={}) {
	console.warn('Forum > find > not fully implemented!');
	const connection = await getConnection();
	const args = getArgs(query);
	const sql = `
		SELECT * FROM forums
		${args.sql};
	`;
	const values = args.val;
	console.log({ sql, values });
	const [ rows, fields ] = await connection.execute(sql, values);
	return rows;
}
async function findOne(query={}) {
	const rows = await find(query);
	if (!rows || !Array.isArray(rows)) throw new Error('Forum > findOne > output not in expected format!');
	return rows[0];
}

async function remove() {
	console.warn('Forum > remove > not implemented!');
}

async function update() {
	console.warn('Forum > update > not implemented!');
}