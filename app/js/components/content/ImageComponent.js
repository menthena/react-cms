'use strict';

import React from 'react/addons';
import DropFileComponent from './DropFileComponent';
import PageComponentActions from './PageComponentActions';
import ReorderMixin from '../../mixins/ReorderMixin';
import ComponentActionCreators from '../../actions/ComponentActionCreators';

let ImageComponent = React.createClass({

  handleContentChange(content) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: content});
  },

  render() {
    let component = this.props.component;
    var classes;
    let userIsAdmin = this.props.userIsAdmin;

    if (userIsAdmin) {
      classes = 'template';
    }

    return (
      <div className={classes} data-droppable='component' data-order={component.order}>
         <DropFileComponent type={'image'} addImage={this.props.addImage} addLink={this.props.addLink} userIsAdmin={this.props.userIsAdmin}></DropFileComponent>
         <PageComponentActions type={component.componentType} userIsAdmin={this.props.userIsAdmin} components={this.props.components} componentId={this.props.componentId} dragStart={this.props.dragStart} dragEnd={this.props.dragEnd} mouseDown={this.props.mouseDown} />
       </div>
      );
  }
});

module.exports = ImageComponent;
