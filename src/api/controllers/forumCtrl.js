const CRUDRoutes = require('crud-routes');
const express = require('express');
const Forum = require('../model/Forum');
const Thread = require('../model/Thread');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

router.get('/forum/metadata', getForumMetadata);

CRUDRoutes(router, '/forum', Forum, { idField:'forumId' });


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