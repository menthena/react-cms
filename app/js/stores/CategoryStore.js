'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CategoryConstants = require('../constants/CategoryConstants');
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = CategoryConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _categories = {};

function _addCategories(rawCategories) {
  _categories = rawCategories;
}

var CategoryStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _categories;
  }
});

CategoryStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_CATEGORIES:
      _addCategories(action.rawCategories);
      // AppDispatcher.waitFor([CategoryStore.dispatchToken]);
      CategoryStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_CATEGORY:
      _categories.push(action.rawCategory);
      CategoryStore.emitChange();
      break;

    case ActionTypes.RECEIVE_UPDATED_CATEGORY:
      _.each(_categories, (category, index) => {
        if (category.id === action.rawCategory.id) {
          _categories[index] = action.rawCategory;
        }
      });
      CategoryStore.emitChange();
      break;

      case ActionTypes.RECEIVE_UPDATED_CATEGORIES:
        _categories = action.rawCategories;
        CategoryStore.emitChange();
        break;

      case ActionTypes.RECEIVE_CREATED_SECTION:
      console.log(action);
        var category = _.find(_categories, { id: action.category_id });
        category.sections.push(action.rawSection);
        CategoryStore.emitChange();
        break;

    default:
      //do nothing
  }
});

module.exports = CategoryStore;