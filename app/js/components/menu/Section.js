'use strict';

var React = require('react/addons');
var MenuSections = require('./MenuSections');
var classNames = require('classnames');
var AppActions = require('../../actions/AppActions');

require('../../../styles/section.sass');

var Section = React.createClass({

  getInitialState: function() {
    return {
      isEditing: false,
      title: this.props.section.title
    };
  },

  deleteSection() {
    var sectionID = this.props.section.id;
    var categoryID = this.props.categoryID;
    AppActions.deleteSection(categoryID, sectionID);
  },

  handleClick: function() {
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
    }, function() {
      React.findDOMNode(this.refs.sectionInput).focus();
    });
  },

  update(event) {
    if (event.keyCode === 13) {
      var sectionID = this.props.section.id;
      var categoryID = this.props.categoryID;
      AppActions.updateSection(categoryID, sectionID, { title: this.state.title });
      this.setState({
        isEditing: false
      });
    }
  },

  handleInputChange(event) {
    this.setState({
      title: event.target.value
    });
  },

  render: function () {
    var section = this.props.section;
    var titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    var titleStyle = { display: !this.state.isEditing ? 'block' : 'none' };
    return (
        <div className="full-section" data-droppable="section" data-order={section.order}>
          <div className="actions right" draggable="true" data-parent="true" onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd}>
            <i className="fa fa-reorder ui-sortable-handle"></i>
          </div>
          <div className="actions left">
            <i className="fa fa-remove" onClick={this.deleteSection}></i>
          </div>
          <span style={titleStyle}>{section.title}<i className="fa fa-pencil" onClick={this.handleEditTitle}></i></span>
          <input style={titleInputStyle} type="text" maxLength="20" ref="sectionInput" name="title" value={this.state.title} onChange={this.handleInputChange} onKeyDown={this.update} />
        </div>
      );
  }
});

module.exports = Section;
