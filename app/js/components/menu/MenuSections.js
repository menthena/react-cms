'use strict';

var React = require('react/addons');
var ReorderMixin = require('../../mixins/ReorderMixin');
var NewSection = require('./NewSection');
var Section = require('./Section');
var _ = require('lodash');
var SectionActionCreators = require('../../actions/SectionActionCreators');

var MenuSections = React.createClass({
  mixins: [ReorderMixin],

  setDraggableData: function(sections) {
    var categoryId = this.props.category.id;
    SectionActionCreators.updateSections(categoryId, sections);
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
              var currentSectionStyle = {
                fontWeight : currentSection === section.title ? 'bold' : 'normal'
              };

              return (
                <li className="full-section" key={section.id} data-order={section.order} style={ currentSectionStyle }>
                  <Section key={ category.title + section.title } section={section} categoryId={this.props.category.id} dragEnd={this.dragEnd} dragStart={this.dragStart}/>
                </li>
              );
            }.bind(this))}
          </ul>
          <NewSection sections={category.sections} categoryId={category.id} />
        </div>
      );
    } else {
      var placeholder;
      if (isVisible) {
        placeholder = <NewSection sections={category.sections} categoryId={category.id} />;
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
