const mongoose = require('mongoose');

const collectionName = 'forums';
const schemaName = 'forum';
const schema = new mongoose.Schema({
	createdBy: { type:String, required:true },
	forumId: { type:Number, required:true },
	title: { type:String, require:true },
	parentForumId: { type:Number },
}, {
	timestamps: true,
});

const model = mongoose.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;