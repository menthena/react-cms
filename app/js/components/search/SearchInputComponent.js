'use strict';

import React from 'react';
import AppStore from '../../stores/AppStore';
import AppActionCreators from '../../actions/AppActionCreators';
import Reflux from 'reflux';

require('../../../styles/SearchComponent.sass');

function getStateFromStores() {
  return {
    searchQuery: AppStore.query
  };
}

const SearchComponent = React.createClass({
  mixins: [Reflux.listenTo(AppStore, '_onChange')],

  getInitialState: getStateFromStores,

  handleChange(e) {
    let value = e.target.value;
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

  render() {
    return (
      <div className='search-component'>
        <i className='fa fa-search'></i>
        <input value={this.state.searchQuery} onChange={this.handleChange} ref='searchInput' placeholder='Search...' />
      </div>
    );
  }
});

module.exports = SearchComponent;
