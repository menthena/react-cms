'use strict';

var React = require('react/addons');
var Editor = require('react-medium-editor');
var PageComponentActions = require('./PageComponentActions');
var ReorderMixin = require('../../mixins/ReorderMixin');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');

require('../../../styles/TextComponent.sass');

var TextComponent = React.createClass({

  handleContentChange: function(content) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: content});
  },

  render: function() {
    var component = this.props.component;
    var userIsAdmin = this.props.userIsAdmin;
    var classes;

    if (userIsAdmin) {
      classes = 'template';
    }

    return (
      <div className={classes} data-droppable="component" data-order={component.order}>
        <div className="editor">
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
