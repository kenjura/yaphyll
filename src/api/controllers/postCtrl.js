const CRUDRoutes = require('crud-routes');
const express = require('express');
const Post = require('../model/Post');

const router = express.Router();

CRUDRoutes(router, '/post', Post, { idField:'postId' });

module.exports = router;