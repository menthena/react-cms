'use strict';

var React = require('react/addons');
var AppStore = require('../../stores/AppStore');
var store = require('../../stores/store.js');
var AppActionCreators = require('../../actions/AppActionCreators');
var Reflux = require('reflux');

require('../../../styles/SearchComponent.sass');

function getStateFromStores() {
  return {
    searchQuery: store.query
  };
}

var SearchComponent = React.createClass({
  mixins: [Reflux.listenTo(store, '_onChange')],

  getInitialState: getStateFromStores,

  handleChange(e) {
    var value = e.target.value;
    AppActionCreators.search(value);
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  componentDidMount() {
    if (this.props.focusOnLoad) {
      React.findDOMNode(this.refs.searchInput).focus();
      React.findDOMNode(this.refs.searchInput).setSelectionRange(AppStore.getSearchQuery().length, 1);
    }
  },

  render: function () {
    return (
      <div className="search-component">
        <i className="fa fa-search"></i>
        <input value={this.state.searchQuery} onChange={this.handleChange} ref="searchInput" placeholder="Search..." />
      </div>
    );
  }
});

module.exports = SearchComponent;
