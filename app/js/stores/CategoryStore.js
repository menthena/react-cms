'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CategoryConstants = require('../constants/CategoryConstants');
var SectionConstants = require('../constants/SectionConstants');
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = CategoryConstants.ActionTypes;
var SectionActionTypes = SectionConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _categories = [];

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
  var category;
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

    case ActionTypes.RECEIVE_DELETED_CATEGORY:
      _.remove(_categories, { id: action.category_id });
      CategoryStore.emitChange();
      break;

    case SectionActionTypes.RECEIVE_CREATED_SECTION:
      category = _.find(_categories, { id: action.category_id });
      category.sections.push(action.section);
      CategoryStore.emitChange();
      break;

    case SectionActionTypes.RECEIVE_DELETED_SECTION:
      category = _.find(_categories, { id: action.category_id });
      _.remove(category.sections, { id: action.section_id });
      CategoryStore.emitChange();
      break;

    case SectionActionTypes.RECEIVE_UPDATED_SECTION:
      _.each(_categories, function(category) {
        _.find(category.sections, function(section, index) {
          if (section.id === action.rawSection.id) {
            category.sections[index] = action.rawSection;
          }
        });
      });
      CategoryStore.emitChange();
      break;

    case SectionActionTypes.RECEIVE_UPDATED_SECTIONS:
      category = _.find(_categories, { id: action.category_id });
      category.sections = action.rawSections;
      CategoryStore.emitChange();
      break;

    default:
      //do nothing
  }
});

module.exports = CategoryStore;
