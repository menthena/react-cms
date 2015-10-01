'use strict';

var React = require('react/addons');
var TextComponent = require('./TextComponent');
var ListComponent = require('./ListComponent');
var ImageComponent = require('./ImageComponent');
var NewSectionComponent = require('./NewSectionComponent');
var Api = require('../../utils/Api');
var ComponentStore = require('../../stores/ComponentStore');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var _ = require('lodash');

require('../../../styles/PageComponent.sass');

function getStateFromStores(sectionId) {
  return {
    allComponents: ComponentStore.getAllBySectionId(sectionId)
  };
}

var PageComponent = React.createClass({
  mixins: [ReorderMixin],

  getInitialState: function() {
    return {
      allComponents: getStateFromStores(this.props.sectionId)
    };
  },

  setDraggableData: function(components) {
    ComponentActionCreators.updateComponents(components);
  },

  _onChange() {
    this.setState(getStateFromStores(this.props.sectionId));
  },

  componentDidMount() {
    Api.getAllComponents(this.props.sectionId);
    ComponentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ComponentStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var template = this.props.template;
    var components = this.state.allComponents;
    var isAdmin = this.props.isAdmin;
    var sectionComponents = [];

    this.loadDraggableData(components);

    _.each(components, function(component) {
      switch (component.componentType) {
        case 'TextComponent':
          sectionComponents.push(<TextComponent components={components} key={component.id} component={component} data={component.data} sectionId={this.props.sectionId} isAdmin={isAdmin} componentId={component.id} dragEnd={this.dragEnd} dragStart={this.dragStart} mouseDown={this.mouseDown}></TextComponent>);
          break;
        case 'ListComponent':
          sectionComponents.push(<ListComponent key={component.id} component={component} data={component.data} sectionId={this.props.sectionId} isAdmin={isAdmin} componentId={component.id} dragEnd={this.dragEnd} dragStart={this.dragStart} mouseDown={this.mouseDown}></ListComponent>);
          break;
        case 'ImageComponent':
          sectionComponents.push(<ImageComponent key={component.id} component={component} data={component.data} sectionId={this.props.sectionId} isAdmin={isAdmin} componentId={component.id} dragEnd={this.dragEnd} dragStart={this.dragStart} mouseDown={this.mouseDown}></ImageComponent>)
          break;
      }
    }.bind(this));

    return (
        <div>
          <div onDragOver={this.dragOver}>
            {sectionComponents}
          </div>
          <NewSectionComponent isAdmin={isAdmin} categoryId={this.props.categoryId} sectionId={this.props.sectionId} template={template}></NewSectionComponent>
        </div>
      );
  }
});

module.exports = PageComponent;
