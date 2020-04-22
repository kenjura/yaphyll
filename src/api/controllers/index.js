// const api = require('./controllers');
const CRUDRoutes = require('crud-routes');
const express = require('express');
const profileCtrl = require('./profileCtrl');
const forumCtrl = require('./forumCtrl');
const threadCtrl = require('./threadCtrl');
const postCtrl = require('./postCtrl');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

router.get('/', (req,res) => res.send('api root'));

router.use('/', requiresAuth());

router.use(forumCtrl);
router.use(threadCtrl);
router.use(postCtrl);
router.use(profileCtrl);




module.exports = router;