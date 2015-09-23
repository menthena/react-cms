'use strict';

var axios = require('axios');
var ServerActions = require('../actions/ServerActions');
var baseApiUrl = 'http://localhost:3001/';
var _ = require('lodash');

var Api = {

  getCategories() {
    return axios.get(baseApiUrl + 'categories?includes=sections').then(function(response) {
      ServerActions.receiveData(response.data.data);
    });
  },

  updateSection(categoryID, sectionID, data) {
    return axios.patch(baseApiUrl + 'categories/' + categoryID + '/sections/' + sectionID, data).then(function(response) {
      ServerActions.receiveSection(sectionID, _.find(response.data.data.sections, {id: sectionID}));
    });
  },

  updateCategory(categoryID, data) {
    return axios.patch(baseApiUrl + 'categories/' + categoryID, data).then(function() {
      ServerActions.receiveCategory(categoryID, data);
    });
  },

  addNewCategory(title, order) {
    axios.post(baseApiUrl + 'categories', { title: title, order: order }).then(function(response) {
      var category = response.data.data;
      ServerActions.receiveNewCategory(category);
    });
  },

  deleteCategory(categoryID) {
    axios.delete(baseApiUrl + 'categories/' + categoryID).then(function() {
      ServerActions.receiveDeletedCategory(categoryID);
    });
  },

  addNewSection(categoryID, title, order) {
    axios.post(baseApiUrl + 'categories/' + categoryID + '/sections', { title: title, order: order }).then(function(response) {
      var section = response.data.data;
      ServerActions.receiveNewSection(categoryID, section);
    });
  },

  deleteSection(categoryID, sectionID) {
    axios.delete(baseApiUrl + 'categories/' + categoryID + '/sections/' + sectionID).then(function() {
      ServerActions.receiveDeletedSection(categoryID, sectionID);
    });
  },

  sortCategorySections(categoryId, sections) {
    var promises = [];
    _.each(sections, (section) => {
      promises.push(axios.patch(baseApiUrl + 'categories/' + categoryId + '/sections/' + section.id, { order: section.order }));
    });
    return axios.all(promises).then(function() {
      ServerActions.receiveSortedCategorySections(categoryId, sections);
    });
  },

  sortSectionItems(sectionID, items) {
    // Missing endpoint?
    return axios.get(baseApiUrl + 'categories').then(function() {
      // Mocking success
      ServerActions.receiveSortedSectionItems(sectionID, items);
    });
  },

  updateComponents(categoryID, sectionID, components) {
    return axios.patch(baseApiUrl + 'categories/' + categoryID + '/sections/' + sectionID, {
      components: components
    }).then(function(response) {
      var data = response.data.data;
      var section = _.find(data.sections, {id: sectionID});
      ServerActions.receiveUpdatedComponents(categoryID, sectionID, section.components);
    });
  },

  sortCategories(categories) {
    var promises = [];
    _.each(categories, (category) => {
      promises.push(axios.patch(baseApiUrl + 'categories/' + category.id, { order: category.order }));
    });
    return axios.all(promises).then(function() {
      ServerActions.receiveSortedCategories(categories);
    });
  }
};

module.exports = Api;
