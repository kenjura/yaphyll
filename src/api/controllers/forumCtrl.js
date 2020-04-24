const express = require('express');
const Forum = require('../model/Forum');
const Thread = require('../model/Thread');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();


router.get('/', async (req, res) => {
	const { query } = req;
	const forums = await Forum.find({ query });
	res.setHeader('x-filter-count', forums.filterCount);
	res.send(forums);
});
router.get('/metadata', getForumMetadata);
router.get('/:forumId', async (req, res) => {
	const query = { forumId:req.params.forumId };
	const forum = await Forum.findOne({ query })
	res.send(forum);
});


async function getForumMetadata(req, res) {
	console.warn('forum metadata disabled!');
	return res.send([]);
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