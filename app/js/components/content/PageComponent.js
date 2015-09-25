'use strict';

var React = require('react/addons');
var TextComponent = require('./TextComponent');
var ListComponent = require('./ListComponent');
var NewSectionComponent = require('./NewSectionComponent');
// var AppActions = require('../../actions/AppActions');
// var AppConstants = require('../../constants/AppConstants');
// var AppStore = require('../../stores/AppStore');
var _ = require('lodash');

require('../../../styles/PageComponent.sass');

var PageComponent = React.createClass({

  getInitialState() {
    return {
      components: []
    };
  },

  _onChange() {
    // this.setState({
    //   components: AppStore.getComponents(this.props.sectionID)
    // });
  },

  componentWillMount() {
    // AppStore.addChangeListener(this._onChange);
    // AppActions.getComponents(this.props.sectionID);
  },

  componentWillUnmount() {
    // AppStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var template = this.props.template;
    var components = this.state.components;
    var isAdmin = this.props.isAdmin;
    var sectionComponents = [];

    _.each(components, function(component) {
      switch (component.componentType) {
        case 'TextComponent':
          sectionComponents.push(<TextComponent categoryID={this.props.categoryID} sectionID={this.props.sectionID} isAdmin={isAdmin} componentID={component.id} template={component.data}></TextComponent>);
          break;
        case 'ListComponent':
          sectionComponents.push(<ListComponent categoryID={this.props.categoryID} sectionID={this.props.sectionID} isAdmin={isAdmin} componentID={component.id}></ListComponent>);
          break;
      }
    }.bind(this));

    return (
        <div>
          {sectionComponents}
          <NewSectionComponent isAdmin={isAdmin} categoryID={this.props.categoryID} sectionID={this.props.sectionID} template={template}></NewSectionComponent>
        </div>
      );
  }
});

module.exports = PageComponent;
