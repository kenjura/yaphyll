const debug = require('debug')('sqlConnection');
const mysql = require('mysql2/promise');

module.exports = { execute, getConnection };

let connection;

async function execute(sql, values) {
	debug(sql);
	const result = await connection.execute(sql, values); 
	debug(result);
	return result;
}

async function getConnection() {
	if (connection) return connection; // TODO: implement connection pooling
	connection = await mysql.createConnection({
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASS,
		database: process.env.MYSQL_DB,
	});
	return connection;
}