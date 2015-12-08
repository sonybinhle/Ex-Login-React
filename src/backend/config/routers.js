'use strict';

var express = require('express');
var routers = express.Router();

var authRouter = require('../modules/auth/routers/authRouter.js');
var apiAuthRouter = require('../modules/auth/routers/apiAuthRouter.js');
var homeRouter = require('../modules/home/routers/homeRouter.js');

routers.use('/auth', authRouter);
routers.use('/api/auth', apiAuthRouter);
routers.use('/', homeRouter);

module.exports = routers;