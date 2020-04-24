const debug = require('debug')('sqlConnection');
const mysql = require('mysql2/promise');

module.exports = { execute, getConnection };

let connection = {};

async function execute(sql, values) {
	debug(sql);
	const result = await connection.execute(sql, values); 
	debug(result);
	return result;
}

async function getConnection({
	host=process.env.MYSQL_HOST,
	port=process.env.MYSQL_PORT,
	user=process.env.MYSQL_USER,
	password=process.env.MYSQL_PASS,
	database=process.env.MYSQL_DB,
}={}) {
	const key = JSON.stringify({ host, port, user, database });
	if (connection[key]) return connection[key]; // TODO: implement connection pooling
	console.log('creating connection for:', { host, port, user, database });
	connection[key] = await mysql.createConnection({
		host,
		port,
		user,
		password,
		database,
	});
	return connection[key];
}