'use strict';

import React from 'react/addons';
import ComponentActionCreators from '../../actions/ComponentActionCreators';
import ReorderMixin from '../../mixins/ReorderMixin';
import ModalMixin from '../../mixins/ModalMixin';

let PageComponentActions = React.createClass({
  mixins: [ModalMixin],

  delete() {
    ComponentActionCreators.deleteComponent(this.props.componentId);
  },

  deleteComponent() {
    let props = {
      actions: this.delete,
      text: 'You are about to delete "' + this.props.type + '"'
    };
    ModalMixin.appendModalToBody(props);
  },

  render() {
    if (this.props.userIsAdmin) {
      return (
        <div className='actions' data-parent='true' draggable='true' onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd} onMouseDown={this.props.mouseDown}>
          <a className='fa fa-arrows fa-lg drag-controller'></a>
          <a className='fa fa-trash-o fa-lg' onClick={this.deleteComponent}></a>
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = PageComponentActions;
