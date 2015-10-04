'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');
var CategoryStore = require('../../stores/CategoryStore');
var SectionListComponent = require('./SectionListComponent');
var SectionActionCreators = require('../../actions/SectionActionCreators');

require('../../../styles/SearchView.sass');
// var foundSections = ['Mocking search result 1', 'Mocking search result 2', 'Mocking search result 3'];
function getStateFromStores() {
  return {
    searchResults: CategoryStore.getSearchResults()
  };
}

var SearchView = React.createClass({

  getInitialState: getStateFromStores,

  _onChange() {
    this.setState(getStateFromStores());
  },

  handleClose() {
    SectionActionCreators.closeSearchView();
  },

  componentDidMount() {
    CategoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var sectionPlaceholder = 'Loading...';

    if (this.state.searchResults.length > 0) {
      sectionPlaceholder = <SectionListComponent sections={this.state.searchResults} />;
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
