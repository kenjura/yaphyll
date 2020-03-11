const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const getConnection = require('../helper/connectionHelper');

const connection = getConnection();
autoIncrement.initialize(connection);

const collectionName = 'threads';
const schemaName = 'thread';
const schema = new mongoose.Schema({
	body: { type:String, required:true },
	createdBy: { type:String, required:true },
	threadId: { type:Number, required:true },
	forumId: { type:Number, required:true },
	title: { type:String, require:true },
}, {
	timestamps: true,
});
schema.plugin(autoIncrement.plugin, { model:'Thread', field:'threadId' });

const model = connection.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;