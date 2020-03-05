const mongoose = require('mongoose');

module.exports = getConnection;

let connection;

function getConnection() {
	if (connection) return connection;

	const mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
	console.log(`attempting to connect to mongo at ${mongoUrl}`);
	connection = mongoose.createConnection(mongoUrl);
	console.log('mongo is connected!');

	return connection;
}