'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var Api = require('../utils/Api');
var AppConstants = require('../constants/AppConstants');
var _ = require('lodash');

EventEmitter.prototype._maxListeners = 100;

var CHANGE_EVENT = 'change';

var _categories = [];

function _updateItem(index, content) {
    //sections[index].title = content;
}

var AppStore = assign(EventEmitter.prototype, {

  loadCategories(data) {
    _categories = data;
  },

  addNewCategory(category) {
    _categories.push(category);
  },

  deleteCategory(categoryID) {
    _.remove(_categories, { id: categoryID });
  },

  addNewSection(categoryID, newCategory) {
    var category = _.find(_categories, { id: categoryID });
    category.sections = newCategory.sections;
  },

  deleteSection(categoryID, sectionID) {
    var category = _.find(_categories, { id: categoryID });
    _.remove(category.sections, { id: sectionID });
  },

  getSection(sectionID) {
    var section;
    _.each(_categories, function(category) {
      if (!section) {
        section = _.find(category.sections, {id: sectionID});
      }
    });
    return section;
  },

  updateComponents(categoryID, sectionID, components) {
    var category = _.find(_categories, { id: categoryID });
    var section = _.find(category.sections, { id: sectionID });
    if (section) {
      section.components = components;
    }
   },

  sortCategorySections(categoryID, sections) {
    if (sections) {
      _.each(_categories, function(category) {
        _.each(category.sections, function(section) {
          if (category.id === categoryID) {
            category.sections = sections;
          }
        });
      });
    }
  },

  sortCategories(dragged, over) {
    _.each(_categories, function(category) {
      if (category.id === dragged.id) {
        category.order = dragged.order;
      } else if (category.id === over.id) {
        category.order = over.order;
      }
    });
  },

  sortSectionItems(sectionID, dragged, over) {
    // TODO
    // _.each(_categories, function(category) {
    //   _.each(category.sections, function(section) {
    //     if (section.id === dragged.id) {
    //       section.order = dragged.order;
    //     } else if (section.id === over.id) {
    //       section.order = dragged.order;
    //     }
    //   });
    // });
  },

  updateSection(index, data){
    _.each(_categories, function(category) {
      var newSection = _.find(category.sections, { id: index });
      if (newSection) {
        _.each(data, function(item, itemIndex) {
          newSection[itemIndex] = item;
        });
      }
    });
  },

  updateCategory(index, data){
    var category = _.find(_categories, { id: index });
    _.each(data, function(value, index) {
      category[index] = value;
    });
  },

  getCategories: function() {
    return _categories;
  },

  emitChange: function(type, data) {
    this.emit(CHANGE_EVENT, type, data);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case AppConstants.UPDATE_SECTION:
      AppStore.updateSection(action.index, action.data);
      AppStore.emitChange(AppConstants.UPDATE_SECTION, action.data.components[action.data.components.length - 1].id);
      break;
    case AppConstants.UPDATE_CATEGORY:
      AppStore.updateCategory(action.index, action.data);
      AppStore.emitChange();
      break;
    case AppConstants.ADD_NEW_CATEGORY:
      AppStore.addNewCategory(action.category);
      AppStore.emitChange();
      break;
    case AppConstants.ADD_NEW_SECTION:
        AppStore.addNewSection(action.categoryID, action.section);
        AppStore.emitChange();
        break;
    case AppConstants.SORT_CATEGORY_SECTIONS:
      AppStore.sortCategorySections(action.categoryID, action.sections);
      AppStore.emitChange();
      break;
    case AppConstants.SORT_SECTION_ITEMS:
      AppStore.sortSectionItems(action.sectionID, action.dragged, action.over);
      AppStore.emitChange();
      break;
    case AppConstants.UPDATE_COMPONENTS:
      AppStore.updateComponents(action.categoryID, action.sectionID, action.components);
      AppStore.emitChange();
      break;
    case AppConstants.DELETE_CATEGORY:
      AppStore.deleteCategory(action.categoryID);
      AppStore.emitChange();
      break;
    case AppConstants.DELETE_SECTION:
      AppStore.deleteSection(action.categoryID, action.sectionID);
      AppStore.emitChange();
      break;
    case AppConstants.SORT_CATEGORIES:
      AppStore.sortCategories(action.dragged, action.over);
      AppStore.emitChange();
      break;
    case AppConstants.ADD_NEW_SECTION_COMPONENT:
      AppStore.emitChange(AppConstants.ADD_NEW_SECTION_COMPONENT);
      break;
    case AppConstants.GET_CATEGORIES:
      AppStore.loadCategories(action.data);
      AppStore.emitChange();
      break;
    case AppConstants.CLOSE_ALL_NEW_SECTION_COMPONENTS:
      AppStore.emitChange(AppConstants.CLOSE_ALL_NEW_SECTION_COMPONENTS);
      break;

    default:
      return true;
  }
});


module.exports = AppStore;
