const express = require('express');
const Post = require('../model/Post');

const router = express.Router();

router.get('/', async (req, res) => {
	const args = req.query;
	const posts = await Post.find(args);
	res.send(posts);
});
router.get('/:postId', async (req, res) => {
	const args = { postId:req.params.postId };
	const post = await Post.findOne(args)
	res.send(post);
});

module.exports = router;