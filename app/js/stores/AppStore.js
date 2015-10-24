'use strict';

import AppActions from '../actions/AppActionCreators';
import Reflux from 'reflux';

let query;
let searchResults = [];
let isSearchInProgress = false;
let authorized = false;

const AppStore = Reflux.createStore({
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

  onReceiveUnauthorizedUser() {
    AppStore.setAuthorizedStatus(true);
    this.trigger();
  },

  onCloseSearchView() {
    isSearchInProgress = false;
    this.trigger();
  },

  get query() {
    return query;
  },

  getSearchResults() {
    return searchResults;
  },

  isSearchInProgress() {
    return isSearchInProgress;
  },

  getSearchQuery() {
    return query;
  },

  userIsUnauthorized() {
    return authorized;
  },

  setAuthorizedStatus(value) {
    authorized = value;
  }

});

export default AppStore;
