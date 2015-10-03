'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ComponentConstants = require('../constants/ComponentConstants');
var assign = require('object-assign');
var _ = require('lodash');

var ComponentActionTypes = ComponentConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _components = [];

function _addComponents(rawComponents) {
  _components = _components.concat(rawComponents);
}

var ComponentStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllBySectionId(sectionId) {
    return _.where(_components, { sectionid: sectionId });
  },

  getAll: function() {
    return _components;
  }
});

ComponentStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {

    case ComponentActionTypes.RECEIVE_RAW_COMPONENTS:
      _addComponents(action.rawComponents);
      ComponentStore.emitChange();
      break;

    case ComponentActionTypes.RECEIVE_CREATED_COMPONENT:
      _components.push(action.rawComponent);
      ComponentStore.emitChange();
      break;

    case ComponentActionTypes.RECEIVE_DELETED_COMPONENT:
      _.remove(_components, { id: action.component_id });
      ComponentStore.emitChange();
      break;

    case ComponentActionTypes.RECEIVE_UPDATED_COMPONENT:
      _.find(_components, function(component) {
        if (component.id === action.component_id) {
          component.data = action.data.data;
        }
      });
      ComponentStore.emitChange();
      break;
      
    case ComponentActionTypes.RECEIVE_UPDATED_COMPONENTS:
      _components = action.rawComponents;
      ComponentStore.emitChange();
      break;

    default:
      //do nothing
  }
});

module.exports = ComponentStore;
