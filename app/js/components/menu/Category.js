'use strict';

import React from 'react';
import ReactDOM  from 'react-dom';
import MenuSections from './MenuSections';
import classNames from 'classnames';
import CategoryActionCreators from '../../actions/CategoryActionCreators';
import ModalMixin from '../../mixins/ModalMixin';

const Category = React.createClass({
  mixins: [ModalMixin],

  getInitialState() {
    return {
      isVisible: false,
      isEditing: false,
      categoryName: this.props.category.title
    };
  },

  delete() {
    let categoryId = this.props.category.id;
    CategoryActionCreators.deleteCategory(categoryId);
  },

  deleteCategory() {
    let props = {
      actions: this.delete,
      text: 'You are about to delete "' + this.state.categoryName + '"'
    };
    ModalMixin.appendModalToBody(props);
  },

  updateCategory() {
    if (event.keyCode === 13) {
      let categoryId = this.props.category.id;
      let categoryName = this.state.categoryName;
      CategoryActionCreators.updateCategory(categoryId, {title: categoryName});
      this.setState({
        isEditing: false
      });
    }
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

  handleEditTitle() {
    this.setState({
      isEditing: true
    }, () => {
      ReactDOM.findDOMNode(this.refs.theInput).focus();
    });
  },

  handleInputChange(event) {
    this.setState({
      categoryName: event.target.value
    });
  },

  render() {
    let category = this.props.category;
    let isVisible = this.state.isVisible;
    let userIsAdmin = this.props.userIsAdmin;
    let deleteAction;
    let arrows;

    let classes = classNames(
      {'has-sections': true },
      {open: isVisible}
    );
    let toggleClasses = classNames(
      {'fa fa-caret-down': isVisible},
      {'fa fa-caret-right': !isVisible}
    );

    let titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    let titleStyle = { display: !(this.state.isEditing && userIsAdmin) ? 'block' : 'none' };

    if (category.sections.length) {
      arrows = <i className={ toggleClasses }></i>;
    }

    let actions = <div className='category-actions actions right'>
      { arrows }
    </div>;

    let categoryName = <div>
      <span style={titleStyle}>{category.title}</span>
    </div>;

    if (userIsAdmin) {
      deleteAction = <div className='actions left'>
        <i className='fa fa-remove' onClick={this.deleteCategory}></i>
      </div>;
      actions = <div className='category-actions actions right' draggable='true' data-parent='true' onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd} onMouseDown={this.props.mouseDown}>
        <i className={ toggleClasses }></i>
        <i className='fa fa-reorder ui-sortable-handle drag-controller'></i>
      </div>;
      categoryName = <div>
        <input style={titleInputStyle} type='text' maxLength='20' ref='theInput' name='title' value={this.state.categoryName} onChange={this.handleInputChange} onKeyDown={this.updateCategory} />
        <span style={titleStyle}>{category.title}
          <i className='fa fa-pencil' onClick={this.handleEditTitle}></i>
        </span>
      </div>
    }

    return (
        <div className='category' data-order={category.order} data-droppable='category' style={{pointerEvents: 'all'}}>
          {deleteAction}
          {actions}
          <h3 className={ classes } onClick={this.handleClick}>
            {categoryName}
          </h3>
          <MenuSections selectedSection={this.props.selectedSection} userIsAdmin={userIsAdmin} category={category} isVisible={this.state.isVisible} />
        </div>
      );
  }
});

module.exports = Category;
