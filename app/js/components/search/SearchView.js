'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');
var AppStore = require('../../stores/AppStore');
var SearchListComponent = require('./SearchListComponent');
var AppActionCreators = require('../../actions/AppActionCreators');

require('../../../styles/SearchView.sass');
function getStateFromStores() {
  return {
    searchResults: AppStore.getSearchResults()
  };
}

var SearchView = React.createClass({

  getInitialState: getStateFromStores,

  _onChange() {
    this.setState(getStateFromStores());
  },

  handleClose() {
    AppActionCreators.closeSearchView();
  },

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var sectionPlaceholder = 'Loading...';

    if (this.state.searchResults.length > 0) {
      sectionPlaceholder = <SearchListComponent sections={this.state.searchResults} />;
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
