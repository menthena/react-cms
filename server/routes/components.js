'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var ResponseHelper = require('./response_helper');
var Component = require('../models/Component');

var allowedComponentProps = ['componentType', 'order', 'data', 'sectionid', 'categoryid'];

router.get('/', function (req, res, next) {
	var query = {};

  if (req.query.sectionid) {
  	query.sectionid = req.query.sectionid;
  } else if (req.query.categoryid) {
  	query.categoryid = req.query.categoryid;
  } else {
  	res.status(400);
  	res.send('Failed to specify a sectionid or categoryid filter');
  	return;
  }

  Component
  .find(query)
  .sort('order')
  .exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.get('/:id', function (req, res, next) {
  Component.findById(req.params.id).exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.post('/', function (req, res, next) {
  var newComponent = _.pick(req.body, allowedComponentProps);
  Component.create(newComponent, ResponseHelper.sanitizeAndSendResponse(res, 201));
});

router.patch('/:id', function (req, res, next) {
  var updatedModel = _.pick(req.body, allowedComponentProps);
  var componentId = req.params.id;

  Component
  .findOneAndUpdate({ _id: componentId }, updatedModel, { 'new': true })
  .exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.delete('/:id', function (req, res, next) {
  Component.remove({ _id: req.params.id }, ResponseHelper.sanitizeAndSendResponse(res, 204));
});

module.exports = router;
