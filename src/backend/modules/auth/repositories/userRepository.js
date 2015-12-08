'use strict';

function UserRepository() {
}

UserRepository.prototype.findUser = function(username) {
  var users = require('./users.json' ).users;

  for (i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return users[i];
    }
  }

  return null;
};

module.exports = new UserRepository();