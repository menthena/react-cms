'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var searchClient = require('../services/search_client');
var Category = require('../models/Category');
var Component = require('../models/Component');
var ResponseHelper = require('./response_helper');

router.get('/', function (req, res, next) {
  searchClient.search(req.query.q).then(function(results) {
    var cleanResults = results.hits.hits.map(function(hit) {
      var matchResult = {
        matchType: hit._type,
        highlight: hit._source.text,
        categoryId: hit._source.category_id
      };

      if (hit._type === 'section' || hit._type === 'component') {
        matchResult.sectionId = hit._source.section_id;
        
        if (hit._type === 'component') {
          matchResult.componentId = hit._source.component_id;
        }
      }

      return matchResult;
    });

    return cleanResults;
  }, function(err) {
    ResponseHelper.sendResponseWithStatus(res, 500, err);
  })
  .then(function(results) {
    ResponseHelper.sendResponseWithStatus(res, 200, null, results);
  });
});

module.exports = router;

