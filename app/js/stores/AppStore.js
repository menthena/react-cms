'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var _unAuth = false;
var searchResults = [];
var isSearchInProgress = false;
var searchQuery;

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

  isSearchInProgress() {
    return isSearchInProgress;
  },

  getSearchResults() {
    return searchResults;
  },

  getSearchQuery() {
    return searchQuery;
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

    case ActionTypes.RECEIVE_SEARCH_RESULTS:
      searchResults = action.searchResults;
      AppStore.emitChange();
      break;

    case ActionTypes.SEARCH:
      isSearchInProgress = true;
      searchQuery = action.query;
      AppStore.emitChange();
      break;

    case ActionTypes.CLOSE_SEARCH_VIEW:
      isSearchInProgress = false;
      AppStore.emitChange();
      break;

    default:
      //do nothing
  }
});

module.exports = AppStore;
