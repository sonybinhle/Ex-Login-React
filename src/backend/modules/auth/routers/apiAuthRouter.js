'use strict';

const express = require('express');
const User = require('../models/user.js');
const userRepository = require('../repositories/userRepository');

let router = express.Router();

router.post('/login', function(req, res) {
  const reqUser = new User(req.body.username, req.body.password);
  const user = userRepository.findUser(reqUser.username);

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
