'use strict';

import AppActions from '../actions/AppActionCreators';
import Reflux from 'reflux';

let query;
let searchResults = [];
let isSearchInProgress = false;
let authorized = false;
let currentSection = {};
let selectedSection = {};

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

  onSetSelectedSection(section) {
    selectedSection = section;
    this.trigger();
  },

  onScrollToSection(section) {
    currentSection = section;
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

  getCurrentSection() {
    return currentSection;
  },

  getSelectedSection() {
    return selectedSection;
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
