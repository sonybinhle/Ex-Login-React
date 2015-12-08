'use strict';

var authenticated = function(req, res, next) {
  if (typeof req.session.username !== 'undefined')
    next();
  else
    return res.redirect('/auth/login');
};

module.exports = authenticated;
