'use strict';

var React = require('react/addons');
var SectionActionCreators = require('../../actions/SectionActionCreators');
var CategoryStore = require('../../stores/CategoryStore');

require('../../../styles/SearchComponent.sass');

function getStateFromStores() {
  return {
    searchQuery: CategoryStore.getSearchQuery()
  };
}

var SearchComponent = React.createClass({

  getInitialState: getStateFromStores,

  handleChange(e) {
    var value = e.target.value;
    SectionActionCreators.searchSections(value);
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  componentDidMount() {
    if (this.props.focusOnLoad) {
      React.findDOMNode(this.refs.searchInput).focus();
    }
    CategoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoryStore.removeChangeListener(this._onChange);
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
