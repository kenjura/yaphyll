const mongoose = require('mongoose');

const collectionName = 'threads';
const schemaName = 'thread';
const schema = new mongoose.Schema({
	createdBy: { type:String, required:true },
	threadId: { type:Number, required:true },
	forumId: { type:Number, required:true },
	title: { type:String, require:true },
}, {
	timestamps: true,
});

const model = mongoose.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;