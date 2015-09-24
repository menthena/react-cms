'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Api = require('../utils/Api');

// Test comment
var AppActions = {

  getCategories(data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_CATEGORIES,
      data: data
    });
    Api.getCategories();
  },

  addNewCategory(title) {
    Api.addNewCategory(title);
  },

  deleteCategory(categoryID) {
    Api.deleteCategory(categoryID);
  },

  updateCategory(categoryID, data) {
    Api.updateCategory(categoryID, data);
  },

  updateComponents(categoryID, sectionID, components) {
    Api.updateComponents(categoryID, sectionID, components);
  },

  addNewSection(categoryID, title) {
    Api.addNewSection(categoryID, title);
  },

  deleteSection(categoryID, sectionID) {
    Api.deleteSection(categoryID, sectionID);
  },

  updateSection(categoryID, sectionID, data) {
    Api.updateSection(categoryID, sectionID, data);
  },

  sortSectionItems(sectionID, dragged, over) {
    Api.sortSectionItems(sectionID, dragged, over);
  },

  sortCategorySections(categoryID, dragged, over) {
    Api.sortCategorySections(categoryID, dragged, over);
  },

  sortCategories(dragged, over) {
    Api.sortCategories(dragged, over);
  },

  closeAllNewSectionComponents() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CLOSE_ALL_NEW_SECTION_COMPONENTS
    });
  },

  addNewSectionComponent(type, sectionID, categoryID) {
    Api.addNewSectionComponent(type, sectionID, categoryID);
  }
};

module.exports = AppActions;
