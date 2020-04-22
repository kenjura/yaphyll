// const api = require('./controllers');
const CRUDRoutes = require('crud-routes');
const express = require('express');
const Forum = require('../model/Forum');
const Post = require('../model/Post');
const Thread = require('../model/Thread');

const router = express.Router();

router.get('/forum/metadata', getForumMetadata);
CRUDRoutes(router, '/forum', Forum);
CRUDRoutes(router, '/post', Post);
CRUDRoutes(router, '/thread', Thread);

router.use('/', (req,res) => res.send('api root'));

async function getForumMetadata(req, res) {
	const md = await Thread.aggregate([
	    { $match: { } },
	    { $group: { _id: "$forumId", count: { $sum:1 }, latest: { $max:'$createdAt' } }}
	]);
	const forumMetadata = md.map(f => ({
		forumId: f._id,
		count: parseInt(f.count),
		latest: f.latest,
	}));
	res.send(forumMetadata);
}


module.exports = router;