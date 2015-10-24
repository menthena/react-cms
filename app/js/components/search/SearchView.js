'use strict';

import React from 'react/addons';
import ComponentActionCreators from '../../actions/ComponentActionCreators';
import ReorderMixin from '../../mixins/ReorderMixin';
import SearchInputComponent from './SearchInputComponent';
import AppStore from '../../stores/AppStore';
import SearchListComponent from './SearchListComponent';
import AppActionCreators from '../../actions/AppActionCreators';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import Reflux from 'reflux';

require('../../../styles/SearchView.sass');
function getStateFromStores() {
  return {
    searchResults: AppStore.getSearchResults()
  };
}

const SearchView = React.createClass({
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

  render() {
    let query = AppStore.getSearchQuery();
    let sectionPlaceholder = 'Loading...';

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
        <a onClick={this.handleClose} className='close-icon'><i className='fa fa-times'></i></a>
        <div className='search-view'>
          <div className='inner-wrap'>
            <span className='title'>SEARCHING:</span>
            <SearchInputComponent focusOnLoad='true' />
            {sectionPlaceholder}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchView;
