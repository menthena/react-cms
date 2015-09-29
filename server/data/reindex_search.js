'use strict';

var q = require('q');
var searchClient = require('../services/search_client');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var config = require('../config');
mongoose.connect(config.db.mongodb);

var Category = require('../models/Category');
var Component = require('../models/Component');


searchClient.deleteAllIndices()
.then(function (body) {
  return Category.find({}); 
})
.then(function(categories) {
  if (categories == null) {
    return;
  }

  var indexPromises = categories.map(function(category) {
    return searchClient.createCategory(category.title, category.id)
      .then(function(indexCategory) {
        var sectionIndexPromises = (category.sections || []).map(function(section) {
          return searchClient.createSection(section.title, category.id, section.id);
        });

        return q.all(sectionIndexPromises);
      });
  });
    
  return q.all(indexPromises);
})
.then (function() {
  return Component.find({});
})
.then(function(components) {
  var indexPromises = components.map(function(component) {
    return searchClient.createComponent(component.searchText, component.categoryid.toHexString(), component.sectionid.toHexString(), component.id);
  });

  return q.all(indexPromises);
})
.then(function() {
  mongoose.disconnect();
});

