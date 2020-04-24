const express = require('express');
const Forum = require('../model/Forum');
const Thread = require('../model/Thread');
const Post = require('../model/Post');

const { getConnection } = require('../helper/sqlConnection');
const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

router.get('/threads-per-forum', getForumMetadata);
router.get('/posts-per-thread/:forumId', getThreadMetadata);



async function getForumMetadata(req, res) {
	const connection = await getConnection();
	const sql = `SELECT forumId, count(*) count, max(createdAt) latest FROM threads GROUP BY forumId`;
	const [ rows, fields ] = await connection.query(sql);
	return res.send(rows);
}
async function getThreadMetadata(req, res) {
	const connection = await getConnection();
	const sql = `
		SELECT threadId, count(*) count, max(createdAt) latest
		FROM posts
		WHERE threadId IN (SELECT DISTINCT threadId FROM threads WHERE forumId = ?)
		GROUP BY threadId;
	`;
	const values = [ req.params.forumId ]
	const [ rows, fields ] = await connection.query(sql, values);
	return res.send(rows);
}


module.exports = router;