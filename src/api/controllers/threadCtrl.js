const express = require('express');
const Post = require('../model/Post');
const Thread = require('../model/Thread');

const router = express.Router();

router.get('/metadata', getThreadMetadata);

router.get('/', async (req, res) => {
	const args = req.query;
	const threads = await Thread.find(args);
	res.send(threads);
});
router.get('/:threadId', async (req, res) => {
	const args = { threadId:req.params.threadId };
	const thread = await Thread.findOne(args)
	res.send(thread);
});


async function getThreadMetadata(req, res) {
	console.warn('forum metadata disabled!');
	return res.send([]);
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