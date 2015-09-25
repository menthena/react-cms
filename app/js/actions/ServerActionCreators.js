'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var CategoryConstants = require('../constants/CategoryConstants');

var ActionTypes = CategoryConstants.ActionTypes;

module.exports = {
  receiveAll: function(rawCategories) {
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

  receiveCreatedSection: function(categoryId, section) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_CREATED_SECTION,
      category_id: categoryId,
      section: section
    });
  }
};
