'use strict';

import React from 'react/addons';
import ReorderMixin from '../../mixins/ReorderMixin';
import NewSection from './NewSection';
import Section from './Section';
import _ from 'lodash';
import SectionActionCreators from '../../actions/SectionActionCreators';

let MenuSections = React.createClass({
  mixins: [ReorderMixin],

  setDraggableData(sections) {
    let categoryId = this.props.category.id;
    SectionActionCreators.updateSections(categoryId, sections);
  },

  render() {
    let category = this.props.category;
    let isVisible = this.props.isVisible;
    let currentSection = this.props.currentSection;
    let userIsAdmin = this.props.userIsAdmin;

    this.loadDraggableData(this.props.category.sections);

    let inlineStyles = {
      display: isVisible ? 'block' : 'none'
    };

    if (category.sections.length) {
      category.sections = _.sortBy(category.sections, 'order');
      return (
        <div onDragOver={this.dragOver} style={ inlineStyles }>
          <ul>
            {category.sections.map((section, index) => {
              let currentSectionStyle = {
                fontWeight: currentSection === section.title ? 'bold' : 'normal'
              };

              return (
                <li className='full-section' key={section.id} data-order={section.order} style={ currentSectionStyle }>
                  <Section key={ category.title + section.title } userIsAdmin={userIsAdmin} section={section} categoryId={this.props.category.id} mouseDown={this.mouseDown} dragEnd={this.dragEnd} dragStart={this.dragStart}/>
                </li>
              );
            })}
          </ul>
          <NewSection userIsAdmin={userIsAdmin} sections={category.sections} categoryId={category.id} />
        </div>
      );
    } else {
      var placeholder;
      if (isVisible) {
        placeholder = <NewSection userIsAdmin={userIsAdmin} sections={category.sections} categoryId={category.id} />;
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
