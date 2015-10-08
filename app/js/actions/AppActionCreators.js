'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Api = require('../utils/Api');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  search: function(query) {
    AppDispatcher.dispatch({
      type: ActionTypes.SEARCH,
      query: query
    });
    Api.search(query);
  },

  closeSearchView() {
    AppDispatcher.dispatch({
      type: ActionTypes.CLOSE_SEARCH_VIEW
    });
  }


};
