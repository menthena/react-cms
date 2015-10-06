'use strict';

var React = require('react/addons');
var DropFileComponent = require('./DropFileComponent');
var PageComponentActions = require('./PageComponentActions');
var ReorderMixin = require('../../mixins/ReorderMixin');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');

var ImageComponent = React.createClass({

  handleContentChange: function(content) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: content});
  },

  render: function () {
    var component = this.props.component;

    return (
        <div className='template' data-droppable="component" data-order={component.order}>
           <DropFileComponent type={'image'} addImage={this.props.addImage} addLink={this.props.addLink} isAdmin={this.props.isAdmin}></DropFileComponent>
           <PageComponentActions type={component.componentType} components={this.props.components} componentId={this.props.componentId} dragStart={this.props.dragStart} dragEnd={this.props.dragEnd} mouseDown={this.props.mouseDown} />
        </div>
      );
  }
});

module.exports = ImageComponent;
