var express = require('express');
var router = express.Router();
var authenticated = require('../../auth/middlewares/authenticated');

router.get('/', authenticated, function(req, res) {
  return res.render('home/index');
});

module.exports = router;
