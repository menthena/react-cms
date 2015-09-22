'use strict';

var axios = require('axios');
var AppActions = require('../actions/AppActions');
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
    return axios.patch(baseApiUrl + 'categories/' + categoryID, data).then(function(response) {
      ServerActions.receiveCategory(categoryID, data);
    });
  },

  addNewCategory(title) {
    axios.post(baseApiUrl + 'categories', { title: title, order: 0 }).then(function(response) {
      var category = response.data.data;
      ServerActions.receiveNewCategory(category);
    });
  },

  deleteCategory(categoryID) {
    axios.delete(baseApiUrl + 'categories/' + categoryID).then(function(response) {
      ServerActions.receiveDeletedCategory(categoryID);
    });
  },

  addNewSection(categoryID, title) {
    axios.post(baseApiUrl + 'categories/' + categoryID + '/sections', { title: title, order: 0 }).then(function(response) {
      var section = response.data.data;
      ServerActions.receiveNewSection(categoryID, section);
    });
  },

  deleteSection(categoryID, sectionID) {
    axios.delete(baseApiUrl + 'categories/' + categoryID + '/sections/' + sectionID).then(function(response) {
      ServerActions.receiveDeletedSection(categoryID, sectionID);
    });
  },

  sortCategorySections(categoryID, dragged, over) {
    return axios.all([
      axios.patch(baseApiUrl + 'categories/' + categoryID + '/sections/' + dragged.id, { order: dragged.order }),
      axios.patch(baseApiUrl + 'categories/' + categoryID + '/sections/' + over.id, { order: over.order })
    ]).then(function(data) {
      // var sections = data[0].data.data.sections;
      var sections = data[0].data.data.sections;
      ServerActions.receiveSortedCategorySections(categoryID, sections);
    });
  },

  sortSectionItems(sectionID, items) {
    // Missing endpoint?
    return axios.get(baseApiUrl + 'categories').then(function(response) {
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

  sortCategories(dragged, over) {
    return axios.all([
      axios.patch(baseApiUrl + 'categories/' + dragged.id, { order: dragged.order }),
      axios.patch(baseApiUrl + 'categories/' + over.id, { order: over.order })
    ]).then(function(data) {
      ServerActions.receiveSortedCategories(dragged, over);
    });
  }
};

module.exports = Api;
