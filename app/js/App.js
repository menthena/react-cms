'use strict';

var _ = require('lodash');
var React = require('react/addons');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Router = require('react-router');
var Menu = require('./components/menu/Menu');
var Content = require('./components/content/Content');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Api = require('./utils/Api');
var AppActions = require('./actions/AppActions');
var AppStore = require('./stores/AppStore');

require('../styles/main.sass');

var App = React.createClass({

  getInitialState: function() {
    return {
      categories: [],
      isAdmin: true
    };
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  handleSectionScroll: function(sectionTitle) {
    this.setState({
      currentSection: sectionTitle
    });
  },

  _onChange() {
    this.setState({
      categories: AppStore.getCategories()
    });
  },

  handleScroll() {
    this.refs.content.onScroll();
  },

  componentDidMount() {
    AppActions.getCategories();
    AppStore.addChangeListener(this._onChange);

    if (ExecutionEnvironment.canUseDOM) {
      document.addEventListener('scroll', this.handleScroll);
    }
  },

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
    document.removeEventListener('scroll', this.handleScroll);
  },

  render: function() {
    var logged = true;
    if (!logged) {
      this.context.router.transitionTo('login');
    }

    return (
      <div id='wrapper'>
        <Menu categories={this.state.categories} currentSection={this.state.currentSection} />
        <Content isAdmin={this.state.isAdmin} categories={this.state.categories} onSectionScroll={this.handleSectionScroll} ref='content' />
      </div>
    );
  }
});

module.exports = App;
