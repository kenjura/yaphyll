// const api = require('./controllers');
const CRUDRoutes = require('crud-routes');
const express = require('express');
const Forum = require('../model/Forum');
const Post = require('../model/Post');
const Thread = require('../model/Thread');

const router = express.Router();

CRUDRoutes(router, '/forum', Forum);
CRUDRoutes(router, '/post', Post);
CRUDRoutes(router, '/thread', Thread);

router.use('/', (req,res) => res.send('api root'));


module.exports = router;