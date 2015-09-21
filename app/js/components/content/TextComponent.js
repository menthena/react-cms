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
    var section = AppStore.getSection(this.props.sectionID);
    console.log(this.state.componentID);
    if (this.state.componentID) {
      // UPDATE
      var component = _.find(section.components, {_id: this.state.componentID});
      component.data = content;
    } else {
      // INSERT
      section.components = section.components || [];
      section.components.push({
        componentType: 'textComponent',
        data: content
      });
    }
    AppActions.updateSection(this.props.categoryID, this.props.sectionID, {components: section.components});
  },

  handleMouseOver() {
    this.setState({
      hovered: this.state.hovered === false ? true : false
    });
  },

  getInitialState: function() {
    return {
      template: this.props.template,
      componentID: this.props.componentID,
      hovered: false
    };
  },

  _onChange(type, componentID) {
    if (type === AppConstants.UPDATE_SECTION) {
      this.setState({
        componentID: componentID
      });
    }
  },

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
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
