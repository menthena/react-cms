  'use strict';

import React from 'react';

import PageComponent from './PageComponent';
import Editor from 'react-medium-editor';
import SectionActionCreators from '../../actions/SectionActionCreators';
import AppActionCreators from '../../actions/AppActionCreators';
import ModalMixin from '../../mixins/ModalMixin';
import AppStore from '../../stores/AppStore';
import ReactDOM  from 'react-dom';
import Reflux from 'reflux';
import Waypoint from 'react-waypoint';
import smoothScroll from 'smoothscroll';

require('../../../styles/ContentSection.sass');

const ContentSection = React.createClass({
  mixins: [ModalMixin, Reflux.listenTo(AppActionCreators.setCurrentSection, "scrollToSection")],

  getInitialState() {
    return {
      isEditing: false,
      sectionName: this.props.section.title
    };
  },

  getOffsetTop() {
    let domNode = ReactDOM.findDOMNode(this);
    return domNode.offsetTop;
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

  scrollToSection(sectionId) {
    if (sectionId === this.props.section.id) {
      let sectionNode = ReactDOM.findDOMNode(this);
      smoothScroll(sectionNode, 200);
    }
  },

  render() {
    let section = this.props.section;
    let sectionId = section.id;
    let userIsAdmin = this.props.userIsAdmin;
    let titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    let titleStyle = { display: !(this.state.isEditing && userIsAdmin) ? 'block' : 'none' };
    let sectionActions;
    let sectionHeading = <div>
      <span style={titleStyle}>{section.title}</span>
    </div>;
    let contentSectionStyles = {
      minHeight : window.innerHeight + 'px'
    };

    if (userIsAdmin) {
      sectionHeading = <div>
        <input style={titleInputStyle} type='text' maxLength='20' ref='sectionInput'
        name='title' value={this.state.sectionName} onChange={this.handleInputChange}
        onKeyDown={this.update} />
        <span style={titleStyle}>{section.title}</span>
      </div>
      sectionActions = <div className='actions'>
        <i className='fa fa-pencil fa-2x' onClick={this.handleEditSectionName}></i>
        <i className='fa fa-trash-o fa-2x' onClick={this.deleteSection}></i>
      </div>;
    }

    return (
        <section style={contentSectionStyles} ref={'section_' + sectionId} id={'section_' + sectionId}>
          <div className='content-inner'>
            <header>
              <h1>{sectionHeading}</h1>
              {sectionActions}
            </header>
            <PageComponent template={this.props.template} userIsAdmin={userIsAdmin} sectionId={sectionId} />
          </div>
        </section>
      );
  }
});

module.exports = ContentSection;
