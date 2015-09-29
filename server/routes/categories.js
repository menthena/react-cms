'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var searchClient = require('../services/search_client');

var ResponseHelper = require('./response_helper');
var Category = require('../models/Category');

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
  var responseHandler = ResponseHelper.sanitizeAndSendResponse(res);

  Category
  .findOneAndUpdate({ _id: req.params.id }, updatedModel, { 'new': true })
  .select('_id title order')
  .then(function(category) {
    responseHandler(null, category);
    searchClient.updateCategory(category.title, category.id, req.query.forcerefresh);
  }, function(err) {
    responseHandler(err);
  });
});

router.patch('/:id/sections/:section_id', function (req, res, next) {
  var updatedModel = _.pick(req.body, allowedSectionProps);
  var responseHandler = ResponseHelper.sanitizeAndSendResponse(res);

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
  .then(function(category) {    
    var updateSection = category.sections.filter(function(section) {
      return section.id === sectionId
    });

    responseHandler(null, updateSection[0]);

    return updateSection[0];
  }, function(err) {
    responseHandler(err);
  })
  .then(function(section) {
    searchClient.updateSection(section.title, section.id, req.query.forcerefresh);
  });
});

router.post('/', function (req, res, next) {
  var newCategory = _.pick(req.body, ['title', 'order']);
  var responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 201);

  Category.create(newCategory)
  .then(function(category) {
    responseHandler(null, category);
    searchClient.createCategory(category.title, category.id, req.query.forcerefresh);
  }, function(err) {
    responseHandler(err);
  });
});

router.post('/:id/sections', function (req, res, next) {
  var newSection = _.pick(req.body, allowedSectionProps);
  var responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 201);
  newSection._id = ObjectId();
  var categoryId = req.params.id;

  Category
  .findOneAndUpdate({ _id: categoryId }, { $push: { sections: newSection }}, { 'new': true })
  .then(function(category) {
    var sectionId = newSection._id.toHexString();

    var createdSection = category.sections.filter(function(section) {
      return section.id === sectionId
    });
    
    responseHandler(null, createdSection[0]);

    return createdSection[0];
  }, function(err) {
    responseHandler(err);
  })
  .then(function(section) {
    searchClient.createSection(section.title, categoryId, section.id, req.query.forcerefresh);
  });
});

router.delete('/:id', function (req, res, next) {
  var responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 204);

  Category.remove({ _id: req.params.id }).then(function() {
    responseHandler();
    searchClient.deleteCategory(req.params.id, req.query.forcerefresh).then(function() {}, function(err) {
      if (err && err.status && err.status === 404) {
        // safe to ignore
      } else {
        responseHandler(err);    
      }
    });
  }, function(err) {
    responseHandler(err);
  }); 
});

router.delete('/:id/sections/:section_id', function (req, res, next) {
  var responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 204);
  var categoryId = req.params.id;
  var sectionId = req.params.section_id;

  Category
  .findOneAndUpdate({ _id: categoryId }, { $pull: { sections: { _id: sectionId }}})
  .then(function() {
    responseHandler();
    searchClient.deleteSection(sectionId, req.query.forcerefresh).then(function() {}, function(err) {
      if (err && err.status && err.status === 404) {
        // safe to ignore
      } else {
        responseHandler(err);    
      }
    });
  }, function(err) {
    responseHandler(err);
  }); 
});


module.exports = router;
