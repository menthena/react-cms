'use strict';

var React = require('react/addons');
var TextComponent = require('./TextComponent');
var ListComponent = require('./ListComponent');
var NewSectionComponent = require('./NewSectionComponent');
var AppActions = require('../../actions/AppActions');
var AppConstants = require('../../constants/AppConstants');
var AppStore = require('../../stores/AppStore');
var _ = require('lodash');

require('../../../styles/PageComponent.sass');

var PageComponent = React.createClass({

  render: function () {
    var template = this.props.template;
    var components = this.props.components;
    var isAdmin = this.props.isAdmin;
    var sectionComponents = [];

    _.each(components, function(component) {
      switch (component.componentType) {
        case 'textComponent':
          sectionComponents.push(<TextComponent categoryID={this.props.categoryID} sectionID={this.props.sectionID} componentID={component._id} isAdmin={isAdmin} template={component.data}></TextComponent>);
          break;
        case 'listComponent':
          sectionComponents.push(<ListComponent categoryID={this.props.categoryID} sectionID={this.props.sectionID} componentID={component._id} isAdmin={isAdmin} components={components}></ListComponent>);
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
