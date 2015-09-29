'use strict';

var axios = require('axios');
// var ServerActions = require('../actions/ServerActions');
var baseApiUrl = 'http://localhost:3001/';
var _ = require('lodash');
var ServerActionCreators = require('../actions/ServerActionCreators');
var CategoryStore = require('../stores/CategoryStore');
var ComponentStore = require('../stores/ComponentStore');

var Api = {

  getAllCategories() {
    return axios.get(baseApiUrl + 'categories?includes=sections').then(function(response) {
      // TODO: Handle errors
      var rawCategories = response.data.data;
      ServerActionCreators.receiveAllCategories(rawCategories);
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
    axios.delete(baseApiUrl + 'categories/' + id).then(function() {
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
    var order = 0;
    var category = _.find(CategoryStore.getAll(), { id: categoryId });
    if (category) {
      order = category.sections.length;
    }
    axios.post(baseApiUrl + 'categories/' + categoryId + '/sections', {title: name, order: order}).then(function(response) {
      // TODO: Handle errors
      ServerActionCreators.receiveCreatedSection(categoryId, response.data.data);
    });
  },

  updateSection(categoryId, sectionId, data) {
    axios.patch(baseApiUrl + 'categories/' + categoryId + '/sections/' + sectionId, data).then(function(response) {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedSection(response.data.data);
    });
  },

  updateSections(categoryId, sections) {
    axios.patch(baseApiUrl + 'categories/' + categoryId, { sections: sections }).then(function() {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedSections(categoryId, sections);
    });
  },

  deleteSection(categoryId, sectionId) {
    axios.delete(baseApiUrl + 'categories/' + categoryId + '/sections/' + sectionId).then(function() {
      ServerActionCreators.receiveDeletedSection(categoryId, sectionId);
    });
  },

  getAllComponents(sectionId) {
    return axios.get(baseApiUrl + 'components?sectionid=' + sectionId).then(function(response) {
      // TODO: Handle errors
      var rawComponents = response.data.data;
      ServerActionCreators.receiveAllComponents(rawComponents);
    });
  },

  createComponent(sectionId, type, data) {
    var order = ComponentStore.getAll().length;
    axios.post(baseApiUrl + 'components', {sectionid: sectionId, componentType: type, order: order, data: data}).then(function(response) {
      // TODO: Handle errors
      ServerActionCreators.receiveCreatedComponent(response.data.data);
    });
  },

  updateComponent(componentId, data) {
    axios.patch(baseApiUrl + 'components/' + componentId, data).then(function() {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedComponent(componentId, data);
    });
  },

  deleteComponent(componentId) {
    axios.delete(baseApiUrl + 'components/' + componentId).then(function() {
      ServerActionCreators.receiveDeletedComponent(componentId);
    });
  },

  updateComponents(components) {
    var promises = [];
    _.each(components, (component) => {
      promises.push(axios.patch(baseApiUrl + 'components/' + component.id, { order: component.order }));
      // TODO: Handle errors
    });
    return axios.all(promises).then(function() {
      ServerActionCreators.receiveUpdatedComponents(components);
    });
  },

};

module.exports = Api;
