'use strict';

import React  from 'react/addons';
import Router from 'react-router';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import Reflux from 'reflux';
import _ from 'lodash';
import Api from './utils/Api';
import CategoryStore from './stores/CategoryStore';
import AppStore from './stores/AppStore';
import SearchView from './components/search/SearchView';
import Menu from './components/menu/Menu';
import Content from './components/content/Content';
import Header from './components/Header';

require('react-fastclick');
require('../styles/main.sass');

function getStateFromStores() {
  return {
    allCategories: CategoryStore.getCategories(),
    isSearchInProgress: AppStore.isSearchInProgress(),
    isAdmin: true
  };
}

const App = React.createClass({
  mixins: [Router.History, Reflux.listenTo(AppStore, '_onChange'), Reflux.listenTo(CategoryStore, '_onChange')],

  getInitialState() {
    return getStateFromStores();
  },

  toggleAdminMode() {
    this.setState({
      userIsAdmin: this.state.userIsAdmin ? false : true
    });
  },

  handleSectionScroll(sectionTitle) {
    this.setState({
      currentSection: sectionTitle
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

  handleScroll() {
    this.refs.content.onScroll();
  },

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      document.addEventListener('scroll', this.handleScroll);
    }
  },

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  },

  render() {
    let MobilePanelVisible = this.state.mobilePanelVisible;
    let isSearchInProgress = this.state.isSearchInProgress;
    let logged = true;
    let classes = 'off-canvas-wrap';
    let userIsAdmin = this.state.userIsAdmin;
    let searchViewPlaceholder;
    let params = this.props.params;

    if (!logged) {
      this.context.router.transitionTo('login');
    }
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
            <Menu userIsAdmin={userIsAdmin} categories={this.state.allCategories} currentSection={this.state.currentSection} />
            <Content userIsAdmin={userIsAdmin} params={params} categories={this.state.allCategories} onSectionScroll={this.handleSectionScroll} ref='content' />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
