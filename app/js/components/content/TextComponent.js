'use strict';

var React = require('react/addons');
var Editor = require('react-medium-editor');
var PageComponentActions = require('./PageComponentActions');
var ReorderMixin = require('../../mixins/ReorderMixin');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');

require('../../../styles/TextComponent.sass');

var TextComponent = React.createClass({

  handleContentChange: function(content) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: content});
  },

  render: function () {
    var component = this.props.component;

    return (
        <div className='template' data-droppable="component" data-order={component.order}>
           <Editor className='editor' text={this.props.data} sectionId={this.props.sectionId} onChange={this.handleContentChange} options={{buttons: ['bold', 'italic', 'underline', 'anchor', 'header2']}}/>
           <PageComponentActions components={this.props.components} componentId={this.props.componentId} dragStart={this.props.dragStart} dragEnd={this.props.dragEnd} mouseDown={this.props.mouseDown} />
        </div>
      );
  }
});

module.exports = TextComponent;
