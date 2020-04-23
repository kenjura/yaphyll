const CRUDRoutes = require('crud-routes');
const express = require('express');
const Post = require('../model/Post');
const Thread = require('../model/Thread');

const router = express.Router();

router.get('/thread/metadata', getThreadMetadata);

CRUDRoutes(router, '/thread', Thread, { idField:'threadId' });


async function getThreadMetadata(req, res) {
	const { forumId } = req.query;
	if (!forumId) return res.status(400).send('forumId is required');

	const threads = await Thread.find({ forumId });
	const threadIds = threads.map(thread => thread.threadId);

	const md = await Post.aggregate([
	    { $match: { threadId: { $in:threadIds } } },
	    { $group: { _id: "$threadId", count: { $sum:1 }, latest: { $max:'$createdAt' } }}
	]);
	const getThreadMetadata = md.map(t => ({
		threadId: t._id,
		count: parseInt(t.count),
		latest: t.latest,
	}));
	res.send(getThreadMetadata);
}


module.exports = router;