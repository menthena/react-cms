'use strict';

var axios = require('axios');
// var ServerActions = require('../actions/ServerActions');
var baseApiUrl = 'http://localhost:3001/';
var _ = require('lodash');
var ServerActionCreators = require('../actions/ServerActionCreators');
var CategoryStore = require('../stores/CategoryStore');

var Api = {

  getAllCategories() {
    return axios.get(baseApiUrl + 'categories?includes=sections').then(function(response) {
      // TODO: Handle errors
      var rawCategories = response.data.data;
      ServerActionCreators.receiveAll(rawCategories);
    });
  },

  createCategory(name) {
    var order = CategoryStore.getAll().length;
    axios.post(baseApiUrl + 'categories', {title: name, order: order}).then(function(response) {
      // TODO: Handle errors
      ServerActionCreators.receiveCreatedCategory(response.data.data);
    });
  },

  deleteCategory(id) {
    axios.delete(baseApiUrl + 'categories/' + id).then(function(response) {
      // TODO: Handle errors
      ServerActionCreators.receiveDeletedCategory(id);
    });
  },

  updateCategory(id, data) {
    axios.patch(baseApiUrl + 'categories/' + id, data).then(function(response) {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedCategory(response.data.data);
    });
  },

  updateCategories(categories) {
    var promises = [];
    _.each(categories, (category) => {
      promises.push(axios.patch(baseApiUrl + 'categories/' + category.id, { order: category.order }));
      // TODO: Handle errors
    });
    return axios.all(promises).then(function() {
      ServerActionCreators.receiveUpdatedCategories(categories);
    });
  },

  createSection(categoryId, name) {
    axios.post(baseApiUrl + 'categories/' + categoryId + '/sections', {title: name}).then(function(response) {
      // TODO: Handle errors
      var sections = response.data.data.sections;
      ServerActionCreators.receiveCreatedSection(categoryId, sections);
    });
  },

  updateSection(categoryId, sectionId, data) {
    axios.patch(baseApiUrl + 'categories/' + categoryId + '/sections/' + sectionId, data).then(function(response) {
      // TODO: Handle errors
      // TODO: Remove this if back-end sends the updated section
      var category = response.data.data;
      var updatedSection = _.find(category.sections, { id: sectionId });
      ServerActionCreators.receiveUpdatedSection(updatedSection);
    });
  },

  deleteSection(categoryId, sectionId) {
    axios.delete(baseApiUrl + 'categories/' + categoryId + '/sections/' + sectionId).then(function(response) {
      ServerActionCreators.receiveDeletedSection(categoryId, sectionId);
    });
  }

};

module.exports = Api;
