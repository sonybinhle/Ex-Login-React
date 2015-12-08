var express = require('express');
var User = require('../models/user.js');
var userRepository = require('../repositories/userRepository');

var router = express.Router();

router.post('/login', function(req, res) {
  var reqUser = new User(req.body.username, req.body.password);
  user = userRepository.findUser(reqUser.username);

  if (user === null) {
    return res.status(404).json({ error : { username: 'Username not found'}});
  }

  if (user.password !== reqUser.password) {
    return res.status(500).json({ error : { password: 'Password do not match'}});
  }

  req.session.username = user.username;

  return res.redirect('/');
});

router.get('/me', function(req, res) {
  return res.json({user : {username: req.session.username}});
});

module.exports = router;
