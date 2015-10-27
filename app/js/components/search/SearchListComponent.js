'use strict';

import _ from 'lodash';
import React from 'react/addons';
import ComponentActionCreators from '../../actions/ComponentActionCreators';
import ReorderMixin from '../../mixins/ReorderMixin';
import SearchInputComponent from './SearchInputComponent';

require('../../../styles/SearchListComponent.sass');

const SearchListComponent = React.createClass({

  render() {
    let results = this.props.results || [];
    let groupedResults = [];
    let templates = [];

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
      <div className='section-list-component'>
        {templates.map((template) => {
          return template;
        })}
      </div>
    );
  }
});

module.exports = SearchListComponent;
