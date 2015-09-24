'use strict';

var React = require('react/addons');
var Editor = require('react-medium-editor');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var AppConstants = require('../../constants/AppConstants');
var _ = require('lodash');

require('../../../styles/TextComponent.sass');

var TextComponent = React.createClass({

  handleContentChange: function(content) {
    AppActions.updateComponent(this.props.componentID, {
      data: content
    });
  },

  handleMouseOver() {
    this.setState({
      hovered: this.state.hovered === false ? true : false
    });
  },

  getInitialState: function() {
    return {
      template: this.props.template,
      hovered: false
    };
  },

  render: function () {
    var className = this.state.hovered ? 'hovered' : '';
    return (
        <div onMouseOver={this.handleMouseOver}>
          <div className="template">
           <Editor sectionID={this.props.sectionID} className={className} text={this.state.template} onChange={this.handleContentChange} options={{buttons: ['bold', 'italic', 'underline', 'anchor', 'header2']}}/>
          </div>
        </div>
      );
  }
});

module.exports = TextComponent;
