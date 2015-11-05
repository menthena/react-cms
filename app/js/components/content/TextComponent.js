'use strict';

import React from 'react';
import Editor from 'react-medium-editor';
import PageComponentActions from './PageComponentActions';
import ReorderMixin from '../../mixins/ReorderMixin';
import ComponentActionCreators from '../../actions/ComponentActionCreators';

require('../../../styles/TextComponent.sass');

const TextComponent = React.createClass({

  handleContentChange(content) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: content});
  },

  render() {
    let component = this.props.component;
    let userIsAdmin = this.props.userIsAdmin;
    let classes;

    if (userIsAdmin) {
      classes = 'template';
    }

    return (
      <div className={classes} data-droppable='component' data-order={component.order}>
        <div className='editor'>
          { userIsAdmin ?
            <Editor text={this.props.data} sectionId={this.props.sectionId}
              onChange={this.handleContentChange} options={{buttons: ['bold', 'italic', 'underline', 'anchor', 'header2']}}/>
          : <div dangerouslySetInnerHTML={{__html: this.props.data}}></div> }
          </div>
          <PageComponentActions type={component.componentType} userIsAdmin={this.props.userIsAdmin} components={this.props.components}
            componentId={this.props.componentId} dragStart={this.props.dragStart} dragEnd={this.props.dragEnd} mouseDown={this.props.mouseDown} />
        </div>
      );
  }
});

module.exports = TextComponent;
