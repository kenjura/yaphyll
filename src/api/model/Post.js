const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const getConnection = require('../helper/connectionHelper');

const connection = getConnection();
autoIncrement.initialize(connection);

const collectionName = 'posts';
const schemaName = 'post';
const schema = new mongoose.Schema({
	createdBy: { type:String, required:true },
	postId: { type:Number, required:true },
	// title: { type:String, required:true },
	threadId: { type:Number, required:true },
	body: { type:String, required:true },
}, {
	timestamps: true,
});
schema.plugin(autoIncrement.plugin, { model:'Post', field:'postId' });

const model = connection.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;