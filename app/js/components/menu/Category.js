'use strict';

var React = require('react/addons');
var MenuSections = require('./MenuSections');
var classNames = require('classnames');
var AppActions = require('../../actions/AppActions');

var Category = React.createClass({

  getInitialState: function() {
    return {
      isVisible: false,
      isEditing: false,
      title: this.props.category.title
    };
  },

  deleteCategory() {
    var categoryID = this.props.category.id;
    AppActions.deleteCategory(categoryID);
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
      React.findDOMNode(this.refs.theInput).focus();
    });
  },

  update(event) {
    if (event.keyCode === 13) {
      var categoryID = this.props.category.id;
      AppActions.updateCategory(categoryID, { title: this.state.title });
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
    var category = this.props.category;
    var isVisible = this.state.isVisible;
    var currentSection = this.props.currentSection;
    var classes = classNames(
      {'has-sections' : true },
      {'open' : isVisible}
    );
    var titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    var titleStyle = { display: !this.state.isEditing ? 'block' : 'none' };
    return (
        <div data-order={category.order} data-droppable="category" draggable="true" parent onMouseEnter={this.props.dragHover} style={{pointerEvents: 'all'}}>
          <div className="actions left">
            <i className="fa fa-remove" onClick={this.deleteCategory}></i>
          </div>
          <div className="actions right" draggable="true" data-parent="true" onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd}>
            <i className="fa fa-reorder ui-sortable-handle"></i>
          </div>
          <h3 className={ classes } onClick={this.handleClick}>
            <input style={titleInputStyle} type="text" maxLength="20" ref="theInput" name="title" value={this.state.title} onChange={this.handleInputChange} onKeyDown={this.update} />
            <span style={titleStyle}>{category.title}<i className="fa fa-pencil" onClick={this.handleEditTitle}></i></span>
          </h3>
          <MenuSections category={category} isVisible={this.state.isVisible} currentSection={currentSection} />
        </div>
      );
  }
});

module.exports = Category;
