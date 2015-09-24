'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var CategoryConstants = require('../constants/CategoryConstants');
var Api = require('../utils/Api');

var ActionTypes = CategoryConstants.ActionTypes;

module.exports = {

  createCategory: function(name) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_CATEGORY,
      name: name
    });
    Api.createCategory(name);
  },

  deleteCategory: function(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_CATEGORY,
      id: id
    });
    Api.deleteCategory(id);
  },

  updateCategory: function(id, data) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_CATEGORY,
      id: id,
      data: data
    });
    Api.updateCategory(id, data);
  }

};
