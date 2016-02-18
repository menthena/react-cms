'use strict';

import React from 'react';
import ContentSection from './ContentSection';
import _ from 'lodash';
import AppActionCreators from '../../actions/AppActionCreators';
import ReactDOM  from 'react-dom';

require('../../../styles/Content.sass');

const Content = React.createClass({

  onScroll() {
    let scrollTop = window.scrollY;
    let closestSection;

    for (var contentsection in this.refs) {
      if (scrollTop >= this.refs[contentsection].getOffsetTop() - 1) {
        closestSection = this.refs[contentsection];
      }
    }
    AppActionCreators.setScrolledToSection(closestSection.props.section.id);
  },

  render() {
    let contentSections = [];
    let categories = _.sortBy(this.props.categories, 'order');
    let userIsAdmin = this.props.userIsAdmin;
    let sections;
    let keyId;
    let params = this.props.params;

    for (var id in categories) {
      for (var key in categories[id].sections) {
        sections = categories[id].sections;
        keyId = id + key + sections[key].id;
        if (params.sectionId === sections[key].id || !params.sectionId) {
          contentSections.push(<ContentSection userIsAdmin={userIsAdmin} key={keyId} categoryId={categories[id].id} section={sections[key]} ref={'contentsection_' + keyId} />);
        }
      }
    }

    return (
        <div id='content'>
          {contentSections}
        </div>
      );
  }
});

module.exports = Content;
