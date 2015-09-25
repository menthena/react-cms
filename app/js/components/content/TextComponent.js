'use strict';

var React = require('react/addons');
var Editor = require('react-medium-editor');
// var AppActions = require('../../actions/AppActions');
// var AppStore = require('../../stores/AppStore');
// var AppConstants = require('../../constants/AppConstants');
var _ = require('lodash');

require('../../../styles/TextComponent.sass');

var TextComponent = React.createClass({

  handleContentChange: function(content) {
    // AppActions.updateComponent(this.props.componentID, {
    //   data: content
    // });
  },

  getInitialState: function() {
    return {
      template: this.props.template,
      hovered: false
    };
  },

  render: function () {
    return (
        <div className='template'>
           <Editor className='editor' sectionID={this.props.sectionID} text={this.state.template} onChange={this.handleContentChange} options={{buttons: ['bold', 'italic', 'underline', 'anchor', 'header2']}}/>
           <div className='actions'>
             <a className='fa fa-trash-o fa-lg'></a>
             <a className='fa fa-trash-o fa-lg'></a>
           </div>
        </div>
      );
  }
});

module.exports = TextComponent;
