  'use strict';

var React = require('react/addons');
var PageComponent = require('./PageComponent');
var Editor = require('react-medium-editor');

require('../../../styles/ContentSection.sass');

var ContentSection = React.createClass({

  componentDidMount: function() {
    // $('h1').on('keydown', this.handleKeyDown);
  },

  propTypes: {
    section: React.PropTypes.object.isRequired
  },

  getOffsetTop: function() {
    var domNode = this.refs['section_' + this.props.section.id].getDOMNode();
    return domNode.getBoundingClientRect().top;
  },

  handleContentChange(title) {
  },

  handleKeyDown: function(e) {
    var ENTER = 13;
    if (e.keyCode === ENTER) {
      if (!event.shiftKey) {
        event.target.blur();
      }
    }
  },

  getInitialState: function() {
    return {
      template: this.props.template
    };
  },

  render: function () {
    var section = this.props.section;
    var isAdmin = this.props.isAdmin;
    var sectionID = section.id;

    return (
        <section ref={'section_' + sectionID}>
          <div className='content-inner'>
            <header>
              <Editor tag="h1" text={section.title} onChange={this.handleContentChange} options={{toolbar: false, buttons: [], disableReturn: true}} />
            </header>
          </div>
        </section>
      );
  }
});

module.exports = ContentSection;
