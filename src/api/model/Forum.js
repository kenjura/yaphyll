const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const getConnection = require('../helper/connectionHelper');

const connection = getConnection();
autoIncrement.initialize(connection);

const collectionName = 'forums';
const schemaName = 'forum';
const schema = new mongoose.Schema({
	createdBy: { type:String, required:true },
	forumId: { type:Number, required:true },
	title: { type:String, require:true },
	displayOrder: { type:Number, required:false },
	parentForumId: { type:Number },
}, {
	timestamps: true,
});
schema.plugin(autoIncrement.plugin, { model:'Forum', field:'forumId' });


const model = connection.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;