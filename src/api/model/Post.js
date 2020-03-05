const mongoose = require('mongoose');

const collectionName = 'posts';
const schemaName = 'post';
const schema = new mongoose.Schema({
	createdBy: { type:String, required:true },
	title: { type:String, required:true },
	threadId: { type:Number, required:true },
	body: { type:String, required:true },
}, {
	timestamps: true,
});

const model = mongoose.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;