'use strict';

import axios from 'axios';
import _ from 'lodash';
import ServerActionCreators from '../actions/ServerActionCreators';
import CategoryStore from '../stores/CategoryStore';
import ComponentStore from '../stores/ComponentStore';
import AppActions from '../actions/AppActionCreators';

const baseApiUrl = 'http://localhost:3001/';

const Api = {

  getUser() {
    return axios.get(baseApiUrl + 'user').then((response) => {
      ServerActionCreators.receiveUser(response.data.data);
    });
  },

  getAllCategories() {
    return axios.get(baseApiUrl + 'categories?includes=sections').then((response) => {
      // TODO: Handle errors
      let rawCategories = response.data.data;
      ServerActionCreators.receiveAllCategories(rawCategories);
    }, function(err) {
      if (err.status === 401) {
        // ServerActionCreators.receiveUnauthorizedUser();
        AppActions.receiveUnauthorizedUser();
      }
    });
  },

  createCategory(name) {
    let order = CategoryStore.getAll().length;
    axios.post(baseApiUrl + 'categories', {title: name, order: order}).then((response) => {
      // TODO: Handle errors
      ServerActionCreators.receiveCreatedCategory(response.data.data);
    });
  },

  deleteCategory(id) {
    axios.delete(baseApiUrl + 'categories/' + id).then(() => {
      // TODO: Handle errors
      ServerActionCreators.receiveDeletedCategory(id);
    });
  },

  updateCategory(id, data) {
    axios.patch(baseApiUrl + 'categories/' + id, data).then((response) => {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedCategory(response.data.data);
    });
  },

  updateCategories(categories) {
    let promises = [];
    _.each(categories, (category) => {
      promises.push(axios.patch(baseApiUrl + 'categories/' + category.id, { order: category.order }));
      // TODO: Handle errors
    });
    return axios.all(promises).then(function() {
      ServerActionCreators.receiveUpdatedCategories(categories);
    });
  },

  createSection(categoryId, name) {
    let order = 0;
    let category = _.find(CategoryStore.getAll(), { id: categoryId });
    if (category) {
      order = category.sections.length;
    }
    axios.post(baseApiUrl + 'categories/' + categoryId + '/sections', {title: name, order: order}).then((response) => {
      // TODO: Handle errors
      ServerActionCreators.receiveCreatedSection(categoryId, response.data.data);
    });
  },

  updateSection(categoryId, sectionId, data) {
    axios.patch(baseApiUrl + 'categories/' + categoryId + '/sections/' + sectionId, data).then((response) => {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedSection(response.data.data);
    });
  },

  updateSections(categoryId, sections) {
    axios.patch(baseApiUrl + 'categories/' + categoryId, { sections: sections }).then(() => {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedSections(categoryId, sections);
    });
  },

  deleteSection(categoryId, sectionId) {
    axios.delete(baseApiUrl + 'categories/' + categoryId + '/sections/' + sectionId).then(() => {
      ServerActionCreators.receiveDeletedSection(categoryId, sectionId);
    });
  },

  search(query) {
    axios.get(baseApiUrl + 'search?q=' + query).then((response) => {
      AppActions.receiveSearchResults(response.data.data);
      // TODO: Handle errors
      // ServerActionCreators.receiveSearchedSections(['Mocking search result 1', 'Mocking search result 2', 'Mocking search result 3']);
    });
  },

  getAllComponents(sectionId) {
    return axios.get(baseApiUrl + 'components?sectionid=' + sectionId).then((response) => {
      // TODO: Handle errors
      let rawComponents = response.data.data;
      ServerActionCreators.receiveAllComponents(rawComponents);
    });
  },

  createComponent(sectionId, type, data) {
    let components = ComponentStore.getAll();
    let order = 0;
    let component = _.filter(components, { sectionid: sectionId });
    if (component) {
      order = component.length;
    }
    axios.post(baseApiUrl + 'components', {sectionid: sectionId, componentType: type, order: order, data: data}).then((response) => {
      // TODO: Handle errors
      ServerActionCreators.receiveCreatedComponent(response.data.data);
    });
  },

  updateComponent(componentId, data) {
    axios.patch(baseApiUrl + 'components/' + componentId, data).then(() => {
      // TODO: Handle errors
      ServerActionCreators.receiveUpdatedComponent(componentId, data);
    });
  },

  deleteComponent(componentId) {
    axios.delete(baseApiUrl + 'components/' + componentId).then(() => {
      ServerActionCreators.receiveDeletedComponent(componentId);
    });
  },

  updateComponents(components) {
    let promises = [];
    _.each(components, (component) => {
      promises.push(axios.patch(baseApiUrl + 'components/' + component.id, { order: component.order }));
      // TODO: Handle errors
    });
    return axios.all(promises).then(() => {
      ServerActionCreators.receiveUpdatedComponents(components);
    });
  }

};

export default Api;
