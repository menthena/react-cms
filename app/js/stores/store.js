'use strict';

var Reflux = require('reflux');
var AppActions = require('../actions/AppActionCreators');

let query;
let searchResults = [];
let isSearchInProgress = false;

var AppStoreTest = Reflux.createStore({
  listenables: [AppActions],

  onSearch(rawQuery) {
    query = rawQuery;
    isSearchInProgress = true;
    this.trigger();
  },

  onReceiveSearchResults(rawSearchResults) {
    searchResults = rawSearchResults;
    this.trigger();
  },

  get query(){
    return query;
  },

  getSearchResults() {
    return searchResults;
  },

  isSearchInProgress() {
    return isSearchInProgress;
  }
});

export default AppStoreTest;
