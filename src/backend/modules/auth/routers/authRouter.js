var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  return res.render('auth/login');
});

router.get('/logout', function(req, res) {
  delete req.session.username;
  return res.redirect('/auth/login');
});

module.exports = router;
