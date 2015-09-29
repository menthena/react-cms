'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');

var PageComponentActions = React.createClass({

  deleteComponent() {
    var categoryId = this.props.componentId;
    ComponentActionCreators.deleteComponent(this.props.componentId);
  },

  render: function () {
    return (
      <div className='actions'>
        <a className='fa fa-arrows fa-lg' draggable="true" data-parent="true" onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd}></a>
        <a className='fa fa-trash-o fa-lg' onClick={this.deleteComponent}></a>
      </div>
    );
  }
});

module.exports = PageComponentActions;
