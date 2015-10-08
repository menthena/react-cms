'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var _unAuth = false;

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUnauthorized() {
    return _unAuth;
  },
  setUnauthorized(val) {
    _unAuth = val;
  }
});

AppStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {

    case ActionTypes.RECEIVE_UNAUTHORIZED_USER:
      AppStore.setUnauthorized(true);
      AppStore.emitChange();
      break;

    default:
      //do nothing
  }
});

module.exports = AppStore;
