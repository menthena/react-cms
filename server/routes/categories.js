'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var ResponseHelper = require('./response_helper');
var Category = require('../models/Category');

//var searchClient = require('../services/search_client');

var allowedSectionProps = ['title', 'order', 'template', 'components'];

router.get('/', function (req, res, next) {
  var query = Category.find({}).sort('order');

  if (req.query.includes !== 'sections') {
    query = query.select('_id title order');
  }

  query.exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.get('/:id', function (req, res, next) {
  var query = Category.findById(req.params.id);

  if (req.query.includes !== 'sections') {
    query = query.select('_id title order');
  }

  query.exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.patch('/:id', function (req, res, next) {
  var updatedModel = _.pick(req.body, ['title', 'order']);

  Category
  .findOneAndUpdate({ _id: req.params.id }, updatedModel, { 'new': true })
  .select('_id title order')
  .exec(ResponseHelper.sanitizeAndSendResponse(res))
  .then(function(category) {
    //if (category) {
    //  searchClient.
    //}
  });
});

router.patch('/:id/sections/:section_id', function (req, res, next) {
  var updatedModel = _.pick(req.body, allowedSectionProps);

  var keys = Object.keys(updatedModel),
      keysLen = keys.length,
      prefix = 'sections.$.';

  for (var i = 0; i < keysLen; i++) {
    updatedModel[prefix+keys[i]] = updatedModel[keys[i]];
    delete updatedModel[keys[i]];
  }

  var categoryId = req.params.id;
  var sectionId = req.params.section_id;

  Category
  .findOneAndUpdate({ _id: categoryId, 'sections._id': sectionId }, updatedModel, { 'new': true })
  .exec(ResponseHelper.sanitizeAndSendResponse(res));
  .then(function(category) {
    var handler = ResponseHelper.sanitizeAndSendResponse(res);

    var updateSection = category.sections.filter(function(section) {
      return section.id === sectionId
    });

    handler(null, updateSection[0]);
  }, function(err) {
    var handler = ResponseHelper.sanitizeAndSendResponse(res);
    handler(err);
  });
});

router.post('/', function (req, res, next) {
  var newCategory = _.pick(req.body, ['title', 'order']);

  Category.create(newCategory, ResponseHelper.sanitizeAndSendResponse(res, 201));
});

router.post('/:id/sections', function (req, res, next) {
  var newSection = _.pick(req.body, allowedSectionProps);
  newSection._id = ObjectId();
  var categoryId = req.params.id;

  Category
  .findOneAndUpdate({ _id: categoryId }, { $push: { sections: newSection }}, { 'new': true })
  .exec(ResponseHelper.sanitizeAndSendResponse(res, 201));
  .then(function(category) {
    var handler = ResponseHelper.sanitizeAndSendResponse(res, 201);
    var sectionId = newSection._id.toHexString();

    var createdSection = category.sections.filter(function(section) {
      return section.id === sectionId
    });
    
    handler(null, createdSection[0]);
  }, function(err) {
    var handler = ResponseHelper.sanitizeAndSendResponse(res);
    handler(err);
  });
});

router.delete('/:id', function (req, res, next) {
  Category.remove({ _id: req.params.id }, ResponseHelper.sanitizeAndSendResponse(res, 204));
});

router.delete('/:id/sections/:section_id', function (req, res, next) {

  var categoryId = req.params.id;
  var sectionId = req.params.section_id;

  Category
  .findOneAndUpdate({ _id: categoryId }, { $pull: { sections: { _id: sectionId }}})
  .exec(ResponseHelper.sanitizeAndSendResponse(res, 204));
});


module.exports = router;
