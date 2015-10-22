'use strict';

var _ = require('lodash');
var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');

require('../../../styles/SearchListComponent.sass');

var SearchListComponent = React.createClass({

  render: function () {
    var results = this.props.results || [];
    var groupedResults = [];
    var templates = [];

    if (results.length) {
      groupedResults = _.groupBy(results, 'matchType');
      if (_.keys(groupedResults).length > 0) {
        _.each(groupedResults, ((groupedResult, key) => {
          let title;
          if (key === 'section') {
            title = 'Sections';
          } else if (key === 'component') {
            title = 'Components';
          }
          if (key === 'section' || key === 'component') {
            templates.push(<div>
              <h3>{title}</h3>
              <ul>
                {groupedResult.map((result) => {
                  return <li><a href={'/section/' + result.sectionId}>{result.highlight}</a></li>;
                })}
              </ul>
            </div>);
          }
        }));
      }
    }



    return (
      <div className="section-list-component">
        {templates.map((template) => {
          return template;
        })}
      </div>
    );
  }
});

module.exports = SearchListComponent;
