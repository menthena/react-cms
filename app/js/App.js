'use strict';

import React  from 'react';
import {History} from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';
import Api from './utils/Api';
import CategoryStore from './stores/CategoryStore';
import UserStore from './stores/UserStore';
import AppStore from './stores/AppStore';
import SearchView from './components/search/SearchView';
import Menu from './components/menu/Menu';
import Content from './components/content/Content';
import Header from './components/Header';
import ExecutionEnvironment from 'exenv';

require('../styles/main.sass');

function getStateFromStores() {
  return {
    allCategories: CategoryStore.getCategories(),
    isSearchInProgress: AppStore.isSearchInProgress(),
    userIsAdmin: false,
    user: UserStore.getUser(),
    selectedSection: AppStore.getSelectedSection(),
    currentSection: AppStore.getCurrentSection()
  };
}

const App = React.createClass({
  mixins: [
    History,
    Reflux.listenTo(AppStore, '_onChange'),
    Reflux.listenTo(CategoryStore, '_onChange'),
    Reflux.listenTo(UserStore, '_onChange')
  ],

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      document.addEventListener('scroll', this.handleScroll);
    }
  },

  handleScroll() {
    this.refs.content.onScroll();
  },

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  },

  getInitialState() {
    return getStateFromStores();
  },

  toggleAdminMode() {
    this.setState({
      userIsAdmin: this.state.userIsAdmin ? false : true
    });
  },

  _onChange() {
    this.setState(getStateFromStores());
    if (AppStore.userIsUnauthorized()) {
      this.history.pushState(null, '/login');
    }
  },

  toggleMobilePanel() {
    this.setState({
      mobilePanelVisible: this.state.mobilePanelVisible ? false : true
    });
  },

  render() {
    let MobilePanelVisible = this.state.mobilePanelVisible;
    let isSearchInProgress = this.state.isSearchInProgress;
    let classes = 'off-canvas-wrap';
    let userIsAdmin = this.state.userIsAdmin;
    let searchViewPlaceholder;
    let params = this.props.params;
    let user = this.state.user;

    if (MobilePanelVisible) {
      classes += ' move-right';
    }

    if (isSearchInProgress) {
      classes += ' search-in-progress';
      searchViewPlaceholder = <SearchView />;
    }

    return (
      <div>
        {searchViewPlaceholder}
        <div className={classes}>
          <div className='inner-wrap'>
            <Header toggleMobilePanel={this.toggleMobilePanel} toggleAdminMode={this.toggleAdminMode} />
            <Menu user={user} selectedSection={this.state.selectedSection} userIsAdmin={userIsAdmin} categories={this.state.allCategories} />
            <Content userIsAdmin={userIsAdmin} currentSection={this.state.currentSection} params={params} categories={this.state.allCategories} ref='content' />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
