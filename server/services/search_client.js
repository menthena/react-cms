'use strict';

var elasticsearch = require('elasticsearch');
var config = require('../config');

var client = new elasticsearch.Client({
  host: config.elastic.host,
  log: config.elastic.log
});

function SearchClient(client) { 
  this.client = client;
}

SearchClient.prototype.search = function(query, titlesOnly, callback) {
  var searchOptions = {
    index: 'tabhqreact',
    body: {
      query: {
        match_phrase_prefix: {
          text: {
            query: query,
            slop: 10,
            max_expansions: 50
          }
        }
      }
    }
  };

  if (titlesOnly) { 
    searchOptions.type = ['category', 'section'];
  }

  return client.search(searchOptions, callback);
};

SearchClient.prototype.createCategory = function(text, categoryId, refresh, callback) {
  return client.create({
    index: 'tabhqreact',
    type: 'category',
    refresh: refresh || false,
    id: categoryId,
    body: {
      text: text,
      category_id: categoryId
    }
  }, callback);
};

SearchClient.prototype.createSection = function(text, categoryId, sectionId, refresh, callback) {
  return client.create({
    index: 'tabhqreact',
    type: 'section',
    refresh: refresh || false,
    id: sectionId,
    body: {
      text: text,
      category_id: categoryId,
      section_id: sectionId
    }
  }, callback);
};

SearchClient.prototype.createComponent = function(text, categoryId, sectionId, componentId, refresh, callback) {
  return client.create({
    index: 'tabhqreact',
    type: 'component',
    refresh: refresh || false,
    id: componentId,
    body: {
      text: text,
      category_id: categoryId,
      section_id: sectionId,
      component_id: componentId
    }
  }, callback);
};

SearchClient.prototype.updateCategory = function(text, id, refresh, callback) {
  return client.update({
    index: 'tabhqreact',
    type: 'category',
    refresh: refresh || false,
    id: id,
    body: {
      doc: {
        text: text
      }
    }
  }, callback);
};

SearchClient.prototype.updateSection = function(text, id, refresh, callback) {
  return client.update({
    index: 'tabhqreact',
    type: 'section',
    refresh: refresh || false,
    id: id,
    body: {
      doc: {
        text: text
      }
    }
  }, callback);
};

SearchClient.prototype.updateComponent = function(text, id, refresh, callback) {
  return client.update({
    index: 'tabhqreact',
    type: 'component',
    refresh: refresh || false,
    id: id,
    body: {
      doc: {
        text: text
      }
    }
  }, callback);
};

SearchClient.prototype.deleteCategory = function(id, refresh, callback) {
  return client.delete({
    index: 'tabhqreact',
    type: 'category',
    refresh: refresh || false,
    id: id
  }, callback);
};

SearchClient.prototype.deleteSection = function(id, refresh, callback) {
  return client.delete({
    index: 'tabhqreact',
    type: 'section',
    refresh: refresh || false,
    id: id
  }, callback);
};

SearchClient.prototype.deleteComponent = function(id, refresh, callback) {
  return client.delete({
    index: 'tabhqreact',
    type: 'component',
    refresh: refresh || false,
    id: id
  }, callback);
};

SearchClient.prototype.deleteAllIndices = function() {
  return client.indices.delete({ index: '_all' });
};

module.exports = new SearchClient(client);
