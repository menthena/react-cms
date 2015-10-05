'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var DeletePrompt = require('../DeletePrompt');

var PageComponentActions = React.createClass({

  delete() {
    var categoryId = this.props.componentId;
    ComponentActionCreators.deleteComponent(this.props.componentId);
  },

  deleteComponent() {
    React.render(<DeletePrompt deleteAction={this.delete} />, document.getElementById('modal-container'));
  },

  render: function () {
    return (
      <div className='actions' data-parent="true" draggable="true" onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd} onMouseDown={this.props.mouseDown}>
        <a className='fa fa-arrows fa-lg drag-controller'></a>
        <a className='fa fa-trash-o fa-lg' onClick={this.deleteComponent}></a>
      </div>
    );
  }
});

module.exports = PageComponentActions;
