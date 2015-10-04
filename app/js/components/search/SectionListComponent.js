'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');

require('../../../styles/SearchListComponent.sass');

var SectionListComponent = React.createClass({

  render: function () {
    var sections = this.props.sections || [];
    return (
      <div className="section-list-component">
        <h3>Sections</h3>
        <ul>
          {sections.map((section) => {
            return <li>{section}</li>;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = SectionListComponent;
