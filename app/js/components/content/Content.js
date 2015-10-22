'use strict';

var React = require('react/addons');
var ContentSection = require('./ContentSection');
var _ = require('lodash');

require('../../../styles/Content.sass');

var Content = React.createClass({

  onScroll: function() {
    var scrollTop = window.scrollY;
    var closestSection;

    for (var contentsection in this.refs ) {
      if (scrollTop >= this.refs[contentsection].getOffsetTop()) {
        closestSection = this.refs[contentsection];
      }
    }

    if (closestSection) {
      this.props.onSectionScroll(closestSection.props.section.title);
    }

  },

  render: function () {
    var contentSections = [];
    var categories = _.sortBy(this.props.categories, 'order');
    var userIsAdmin = this.props.userIsAdmin;
    var sections;
    var keyId;
    var params = this.props.params;

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
        <div id="content">
          {contentSections}
        </div>
      );
  }
});

module.exports = Content;
