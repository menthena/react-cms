'use strict';

import React from 'react/addons';
import TextComponent from './TextComponent';
import ListComponent from './ListComponent';
import ImageComponent from './ImageComponent';
import NewSectionComponent from './NewSectionComponent';
import Api from '../../utils/Api';
import ComponentStore from '../../stores/ComponentStore';
import ComponentActionCreators from '../../actions/ComponentActionCreators';
import ReorderMixin from '../../mixins/ReorderMixin';
import _ from 'lodash';
import Reflux from 'reflux';

require('../../../styles/PageComponent.sass');

function getStateFromStores(sectionId) {
  return {
    allComponents: ComponentStore.getAllBySectionId(sectionId)
  };
}

const PageComponent = React.createClass({
  mixins: [ReorderMixin, Reflux.listenTo(ComponentStore, '_onChange')],

  getInitialState() {
    return {
      allComponents: getStateFromStores(this.props.sectionId)
    };
  },

  setDraggableData(components) {
    ComponentActionCreators.updateComponents(components);
  },

  _onChange() {
    this.setState(getStateFromStores(this.props.sectionId));
  },

  componentDidMount() {
    Api.getAllComponents(this.props.sectionId);
  },

  render() {
    let template = this.props.template;
    let components = this.state.allComponents;
    let userIsAdmin = this.props.userIsAdmin;
    let sectionComponents = [];

    this.loadDraggableData(components);

    _.each(components, ((component) => {
      switch (component.componentType) {
        case 'TextComponent':
          sectionComponents.push(<TextComponent components={components} key={component.id} component={component} data={component.data} sectionId={this.props.sectionId} userIsAdmin={userIsAdmin} componentId={component.id} dragEnd={this.dragEnd} dragStart={this.dragStart} mouseDown={this.mouseDown}></TextComponent>);
          break;
        case 'ListComponent':
          sectionComponents.push(<ListComponent key={component.id} component={component} data={component.data} sectionId={this.props.sectionId} userIsAdmin={userIsAdmin} componentId={component.id} dragEnd={this.dragEnd} dragStart={this.dragStart} mouseDown={this.mouseDown}></ListComponent>);
          break;
        case 'ImageComponent':
          sectionComponents.push(<ImageComponent key={component.id} component={component} data={component.data} sectionId={this.props.sectionId} userIsAdmin={userIsAdmin} componentId={component.id} dragEnd={this.dragEnd} dragStart={this.dragStart} mouseDown={this.mouseDown}></ImageComponent>)
          break;
      }
    }));

    return (
        <div>
          <div onDragOver={this.dragOver}>
            {sectionComponents}
          </div>
          <NewSectionComponent userIsAdmin={userIsAdmin} categoryId={this.props.categoryId} sectionId={this.props.sectionId} template={template}></NewSectionComponent>
        </div>
      );
  }
});

module.exports = PageComponent;
