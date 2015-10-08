'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');

require('../../../styles/SearchListComponent.sass');

var SearchListComponent = React.createClass({

  render: function () {
    console.log('a');
    var results = this.props.results || [];
    var groupedResults = _.groupBy(results, 'matchType');


    return (
      <div className="section-list-component">
        {
          groupedResults.map((groupedResult) => {
            let title;
            if (groupedResult[0].matchType === 'section') {
              title = 'Sectionsx';
            } else if (groupedResult[0].matchType === 'component') {
              title = 'Components';
            }

            return (
              <div>
                <h3>{title}</h3>
                <ul>
                  {groupedResult.map((result) => {
                    return <li>{section}</li>;
                  })}
                </ul>
              </div>
            );
          })
        }
      </div>
    );
  }
});

module.exports = SearchListComponent;
