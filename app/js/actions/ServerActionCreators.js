'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var CategoryConstants = require('../constants/CategoryConstants');
var SectionConstants = require('../constants/SectionConstants');
var ComponentConstants = require('../constants/ComponentConstants');

var ActionTypes = CategoryConstants.ActionTypes;
var SectionActionTypes = SectionConstants.ActionTypes;
var ComponentActionTypes = ComponentConstants.ActionTypes;

module.exports = {
  receiveAllCategories: function(rawCategories) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_CATEGORIES,
      rawCategories: rawCategories
    });
  },

  receiveCreatedCategory: function(createdCategory) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_CREATED_CATEGORY,
      rawCategory: createdCategory
    });
  },

  receiveUpdatedCategory: function(updatedCategory) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_UPDATED_CATEGORY,
      rawCategory: updatedCategory
    });
  },

  receiveUpdatedCategories: function(updatedCategories) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_UPDATED_CATEGORIES,
      rawCategories: updatedCategories
    });
  },

  receiveDeletedCategory: function(categoryId) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_DELETED_CATEGORY,
      category_id: categoryId
    });
  },

  receiveCreatedSection: function(categoryId, section) {
    AppDispatcher.dispatch({
      type: SectionActionTypes.RECEIVE_CREATED_SECTION,
      category_id: categoryId,
      section: section
    });
  },

  receiveUpdatedSection: function(updatedSection) {
    AppDispatcher.dispatch({
      type: SectionActionTypes.RECEIVE_UPDATED_SECTION,
      rawSection: updatedSection
    });
  },

  receiveUpdatedSections: function(categoryId, updatedSections) {
    AppDispatcher.dispatch({
      type: SectionActionTypes.RECEIVE_UPDATED_SECTIONS,
      category_id: categoryId,
      rawSections: updatedSections
    });
  },

  receiveDeletedSection: function(categoryId, sectionId) {
    AppDispatcher.dispatch({
      type: SectionActionTypes.RECEIVE_DELETED_SECTION,
      category_id: categoryId,
      section_id: sectionId
    });
  },

  receiveAllComponents: function(rawComponents) {
    AppDispatcher.dispatch({
      type: ComponentActionTypes.RECEIVE_RAW_COMPONENTS,
      rawComponents: rawComponents
    });
  },

  receiveCreatedComponent: function(rawComponent) {
    AppDispatcher.dispatch({
      type: ComponentActionTypes.RECEIVE_CREATED_COMPONENT,
      rawComponent: rawComponent
    });
  },

  receiveUpdatedComponent: function(componentId, data) {
    AppDispatcher.dispatch({
      type: ComponentActionTypes.RECEIVE_UPDATED_COMPONENT,
      component_id: componentId,
      data: data
    });
  },

  receiveDeletedComponent: function(componentId) {
    AppDispatcher.dispatch({
      type: ComponentActionTypes.RECEIVE_DELETED_COMPONENT,
      component_id: componentId
    });
  },

  receiveUpdatedComponents: function(updatedComponents) {
    AppDispatcher.dispatch({
      type: ComponentActionTypes.RECEIVE_UPDATED_COMPONENTS,
      rawComponents: updatedComponents
    });
  }
};
