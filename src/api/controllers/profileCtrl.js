const express = require('express');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(req.openid.user);
});


module.exports = router;