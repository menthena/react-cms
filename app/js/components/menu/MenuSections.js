'use strict';

import React from 'react';
import ReactDOM from  'react-dom';
import ReorderMixin from '../../mixins/ReorderMixin';
import NewSection from './NewSection';
import Section from './Section';
import _ from 'lodash';
import SectionActionCreators from '../../actions/SectionActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import AppStore from '../../stores/AppStore';
import Reflux from 'reflux';

let currentSectionStyle = {};

const MenuSections = React.createClass({
  mixins: [ReorderMixin, Reflux.connect(AppActionCreators.setScrolledToSection, 'scrolledToSection')],

  setDraggableData(sections) {
    let categoryId = this.props.category.id;
    SectionActionCreators.updateSections(categoryId, sections);
  },

  handleClick(section) {
    AppActionCreators.setCurrentSection(section.id);
  },

  render() {
    let category = this.props.category;
    let isVisible = this.props.isVisible;
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
              let currentSectionStyle = {};
              if (this.state.scrolledToSection) {
                currentSectionStyle = {
                  fontWeight: this.state.scrolledToSection === section.id ? 'bold' : 'normal'
                };
              }

              return (
                <li className='full-section' key={section.id} data-order={section.order} style={ currentSectionStyle } onClick={this.handleClick.bind(this, section)}>
                  <Section key={ category.title + section.title } userIsAdmin={userIsAdmin} section={section} categoryId={this.props.category.id} mouseDown={this.mouseDown} dragEnd={this.dragEnd} dragStart={this.dragStart}/>
                </li>
              );
            })}
          </ul>
          <NewSection userIsAdmin={userIsAdmin} sections={category.sections} categoryId={category.id} />
        </div>
      );
    } else {
      let placeholder;
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
