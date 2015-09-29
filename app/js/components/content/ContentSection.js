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

  render: function () {
    var section = this.props.section;
    var sectionId = section.id;

    return (
        <section ref={'section_' + sectionId}>
          <div className='content-inner'>
            <header>
              <Editor tag="h1" text={section.title} onChange={this.handleContentChange} options={{toolbar: false, buttons: [], disableReturn: true}} />
            </header>
            <PageComponent template={this.props.template} isAdmin={this.props.isAdmin} sectionId={sectionId} />
          </div>
        </section>
      );
  }
});

module.exports = ContentSection;
