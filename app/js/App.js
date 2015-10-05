'use strict';

require('react-fastclick');
var _ = require('lodash');
var React = require('react/addons');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Router = require('react-router');
var Menu = require('./components/menu/Menu');
var Content = require('./components/content/Content');
var Header = require('./components/Header');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Api = require('./utils/Api');
var CategoryStore = require('./stores/CategoryStore');

require('../styles/main.sass');

function getStateFromStores() {
  return {
    allCategories: CategoryStore.getAll(),
    isAdmin: true
  };
}

var App = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
    // return {
    //   isAdmin: true,
    // };
  },

  // contextTypes: {
  //   router: React.PropTypes.func
  // },

  handleSectionScroll: function(sectionTitle) {
    this.setState({
      currentSection: sectionTitle
    });
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  toggleMobilePanel() {
    this.setState({
      mobilePanelVisible : this.state.mobilePanelVisible ? false : true
    });
  },

  handleScroll() {
    this.refs.content.onScroll();
  },

  componentDidMount() {
    CategoryStore.addChangeListener(this._onChange);

    if (ExecutionEnvironment.canUseDOM) {
      document.addEventListener('scroll', this.handleScroll);
    }
  },

  componentWillUnmount() {
    CategoryStore.removeChangeListener(this._onChange);
    document.removeEventListener('scroll', this.handleScroll);
  },

  render: function() {
    var MobilePanelVisible = this.state.mobilePanelVisible;
    var logged = true;
    var classes = 'off-canvas-wrap';
    if (!logged) {
      this.context.router.transitionTo('login');
    }
    if (MobilePanelVisible) {
      classes += ' move-right';
    }

    return (
      <div className={classes}>
        <div className='inner-wrap'>
          <Header toggleMobilePanel={this.toggleMobilePanel} />
          <Menu categories={this.state.allCategories} currentSection={this.state.currentSection} />
          <Content isAdmin={this.state.isAdmin} categories={this.state.allCategories} onSectionScroll={this.handleSectionScroll} ref='content' />
        </div>
      </div>
    );
  }
});

module.exports = App;
