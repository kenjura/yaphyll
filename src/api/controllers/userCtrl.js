const express = require('express');
const User = require('../model/User');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

router.get('/profile', requiresAuth(), async (req, res) => {
  res.send(req.openid.user);

  // update last visited
  const { email } = req.openid.user;
  const query = { email };
  const row = { lastVisited:formatDateForMysql(new Date()) };
  const affectedRows = await User.update({ query, row });
  if (affectedRows !== 1) {
  	console.error('userCtrl > failed to update lastVisited for current user! something is wrong...');
  }
});

function formatDateForMysql(date) { // sigh. wtf mysql
	return date.toJSON().slice(0, 19).replace('T', ' ');
}

module.exports = router;