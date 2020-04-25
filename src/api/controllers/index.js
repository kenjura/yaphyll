// const api = require('./controllers');
const express = require('express');
const forumCtrl = require('./forumCtrl');
const metadataCtrl = require('./metadataCtrl');
const threadCtrl = require('./threadCtrl');
const postCtrl = require('./postCtrl');
const userCtrl = require('./userCtrl');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

router.get('/', (req,res) => res.send('api root'));

router.use('/', requiresAuth());

router.use('/forum', forumCtrl);
router.use('/metadata', metadataCtrl);
router.use('/thread', threadCtrl);
router.use('/post', postCtrl);
router.use('/user', userCtrl);




module.exports = router;