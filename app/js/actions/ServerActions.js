'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppStore = require('../stores/AppStore');
var AppConstants = require('../constants/AppConstants');

var ServerActions = {
  receiveData: function(data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_CATEGORIES,
      data: data
    });
  },

  receiveNewCategory(category) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_NEW_CATEGORY,
      category: category
    });
  },

  receiveDeletedCategory(categoryID) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DELETE_CATEGORY,
      categoryID: categoryID
    });
  },

  receiveComponents(components) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_COMPONENTS,
      components: components
    });
  },

  receiveNewSectionComponent(component) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_NEW_SECTION_COMPONENT,
      component: component
    });
  },

  receiveNewSection(categoryID, section) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_NEW_SECTION,
      section: section,
      categoryID: categoryID
    });
  },

  receiveDeletedSection(categoryID, sectionID) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DELETE_SECTION,
      sectionID: sectionID,
      categoryID: categoryID
    });
  },

  receiveSection(index, data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_SECTION,
      index: index,
      data: data
    });
  },

  receiveCategory(index, data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_CATEGORY,
      index: index,
      data: data
    });
  },

  receiveSortedSectionItems: function(sectionID, items) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SORT_SECTION_ITEMS,
      sectionID: sectionID,
      items: items
    });
  },

  receiveSortedCategorySections: function(categoryID, sections) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SORT_CATEGORY_SECTIONS,
      categoryID: categoryID,
      sections: sections
    });
  },

  receiveSortedCategories: function(categories) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SORT_CATEGORIES,
      categories: categories
    });
  }
};

module.exports = ServerActions;
