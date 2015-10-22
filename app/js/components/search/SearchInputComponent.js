'use strict';

var React = require('react/addons');
var AppActionCreators = require('../../actions/AppActionCreators');
var AppStore = require('../../stores/AppStore');

require('../../../styles/SearchComponent.sass');

function getStateFromStores() {
  return {
    searchQuery: AppStore.getSearchQuery()
  };
}

var SearchComponent = React.createClass({

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
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
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
