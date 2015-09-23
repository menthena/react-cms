'use strict';

var React = require('react/addons');
var ReorderMixin = require('../../mixins/ReorderMixin');
var AppActions = require('../../actions/AppActions');
var NewSection = require('./NewSection');
var Section = require('./Section');
var _ = require('lodash');

var MenuSections = React.createClass({
  mixins: [ReorderMixin],

  getInitialState() {
    return {
      isEditing: false,
      title: '',
      sectionID: null
    };
  },

  setDraggableData: function(sections) {
    var categoryID = this.props.category.id;
    AppActions.sortCategorySections(categoryID, sections);
  },

  render: function () {
    var category = this.props.category;
    var isVisible = this.props.isVisible;
    var currentSection = this.props.currentSection;

    this.loadDraggableData(this.props.category.sections);

    var inlineStyles = {
      display : isVisible ? 'block' : 'none'
    };

    if (category.sections.length) {
      category.sections = _.sortBy(category.sections, 'order');
      return (
        <div onDragOver={this.dragOver} style={ inlineStyles }>
          <ul>
            {category.sections.map(function(section, index) {
              var titleInputStyle = { display: this.state.isEditing && this.state.sectionID === section.id ? 'block' : 'none' };
              var titleStyle = { display: !this.state.isEditing && this.state.sectionID === section.id ? 'block' : 'none' };
              var currentSectionStyle = {
                fontWeight : currentSection === section.title ? 'bold' : 'normal'
              };

              return (
                <li className="full-section" data-order={section.order} style={ currentSectionStyle }>
                  <Section key={ category.title + section.title } section={section} categoryID={this.props.category.id} dragEnd={this.dragEnd} dragStart={this.dragStart}/>
                </li>
              );
            }.bind(this))}
          </ul>
          <NewSection sections={category.sections} categoryID={category.id} />
        </div>
      );
    } else {
      var placeholder;
      if (isVisible) {
        placeholder = <NewSection sections={category.sections} categoryID={category.id} />;
      }
      return (
        <div>
          {placeholder}
        </div>
      );
    }
  }
});

module.exports = MenuSections;
