'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');
var AppStore = require('../../stores/AppStore');
var SearchListComponent = require('./SearchListComponent');
var store = require('../../stores/store.js');
var AppActionCreators = require('../../actions/AppActionCreators');
var Reflux = require('reflux');

require('../../../styles/SearchView.sass');
function getStateFromStores() {
  return {
    searchResults: store.getSearchResults()
  };
}

var SearchView = React.createClass({
  mixins: [Reflux.listenTo(store, '_onChange')],

  getInitialState: getStateFromStores,

  _onChange() {
    this.setState(getStateFromStores());
  },

  handleClose() {
    AppActionCreators.closeSearchView();
  },

  render: function () {
    var query = AppStore.getSearchQuery();
    var sectionPlaceholder = 'Loading...';

    if (query.length > 1) {
      if (this.state.searchResults.length > 0) {
        sectionPlaceholder = <SearchListComponent results={this.state.searchResults} />;
      } else if (this.state.searchResults.length === 0) {
        sectionPlaceholder = <div>Not found</div>;
      }
    } else {
      sectionPlaceholder = 'Min 2 characters...';
    }

    return (
      <div>
        <a onClick={this.handleClose} className="close-icon"><i className="fa fa-times"></i></a>
        <div className="search-view">
          <div className="inner-wrap">
            <span className="title">SEARCHING:</span>
            <SearchInputComponent focusOnLoad="true" />
            {sectionPlaceholder}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchView;
