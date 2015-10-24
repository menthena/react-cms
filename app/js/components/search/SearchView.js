'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');
var AppStore = require('../../stores/AppStore');
var SearchListComponent = require('./SearchListComponent');
var AppActionCreators = require('../../actions/AppActionCreators');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Reflux = require('reflux');

require('../../../styles/SearchView.sass');
function getStateFromStores() {
  return {
    searchResults: AppStore.getSearchResults()
  };
}

var SearchView = React.createClass({
  mixins: [Reflux.listenTo(AppStore, '_onChange')],

  getInitialState: getStateFromStores,

  _onChange() {
    this.setState(getStateFromStores());
  },

  handleClose() {
    AppActionCreators.closeSearchView();
  },

  handleKeyPress(event) {
    if (event.keyCode === 27) {
      this.handleClose();
    }
  },

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      document.addEventListener('keyup', this.handleKeyPress);
    }
  },

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  },

  render: function() {
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
