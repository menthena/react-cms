'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var ResponseHelper = require('./response_helper');
var User = require('../models/User');

router.get('/', function (req, res, next) {
  var query = User.findOne();
  query.exec(ResponseHelper.sanitizeAndSendResponse(res));
});


module.exports = router;
