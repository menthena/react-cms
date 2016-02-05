'use strict';

import React from 'react';
import ReactDOM  from 'react-dom';
import SectionActionCreators from '../../actions/SectionActionCreators';
import ModalMixin from '../../mixins/ModalMixin';

require('../../../styles/section.sass');

const Section = React.createClass({
  mixins: [ModalMixin],

  getInitialState() {
    return {
      isEditing: false,
      sectionName: this.props.section.title
    };
  },

  delete() {
    let sectionId = this.props.section.id;
    let categoryId = this.props.categoryId;
    SectionActionCreators.deleteSection(categoryId, sectionId);
  },

  deleteSection() {
    let props = {
      actions: this.delete,
      text: 'You are about to delete "' + this.state.sectionName + '"'
    };
    ModalMixin.appendModalToBody(props);
  },

  handleClick() {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true
      });
    } else {
      this.setState({
        isVisible: false
      });
    }
  },

  handleEditSectionName() {
    this.setState({
      isEditing: true
    }, () => {
      ReactDOM.findDOMNode(this.refs.sectionInput).focus();
    });
  },

  update(event) {
    if (event.keyCode === 13) {
      let sectionId = this.props.section.id;
      let categoryId = this.props.categoryId;
      SectionActionCreators.updateSection(categoryId, sectionId, { title: this.state.sectionName });
      this.setState({
        isEditing: false
      });
    }
  },

  handleInputChange(event) {
    this.setState({
      sectionName: event.target.value
    });
  },

  render() {
    let section = this.props.section;
    let userIsAdmin = this.props.userIsAdmin;
    let titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    let titleStyle = { display: !(this.state.isEditing && userIsAdmin) ? 'block' : 'none' };
    let deleteAction;
    let actions;

    let sectionName = <div>
      <span style={titleStyle}>{section.title}</span>
    </div>;

    if (userIsAdmin) {
      deleteAction = <div className='actions left'>
        <i className='fa fa-remove' onClick={this.deleteSection}></i>
      </div>;
      actions = <div className='actions right' draggable='true' data-parent='true' onMouseDown={this.props.mouseDown} onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd}>
        <i className='fa fa-reorder ui-sortable-handle drag-controller'></i>
      </div>;
      sectionName = <div>
        <input style={titleInputStyle} type='text' maxLength='20' ref='sectionInput' name='title' value={this.state.sectionName} onChange={this.handleInputChange} onKeyDown={this.update} />
        <span style={titleStyle}>{section.title}<i className='fa fa-pencil' onClick={this.handleEditSectionName}></i></span>
      </div>;
    }

    return (
        <div className='full-section' data-droppable='section' data-order={section.order}>
          {deleteAction}
          {actions}
          {sectionName}
        </div>
      );
  }
});

module.exports = Section;
