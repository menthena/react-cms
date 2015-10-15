'use strict';

var React = require('react/addons');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var ReorderMixin = require('../../mixins/ReorderMixin');
var SearchInputComponent = require('./SearchInputComponent');

require('../../../styles/SearchListComponent.sass');

var SearchListComponent = React.createClass({

  render: function () {
    return (
      '<div>a</div>'
    );
    // console.log('a');
    // var results = this.props.results || [];
    // var groupedResults = [];
    //
    // if (results.length) {
    //   console.log(results.length);
    //   groupedResults = _.groupBy(results, 'matchType');
    //   console.log(groupedResults.length);
    //   if (groupedResults.length) {
    //     groupedResults.map((groupedResult) => {
    //       let title;
    //       if (groupedResult[0].matchType === 'section') {
    //         title = 'Sections';
    //       } else if (groupedResult[0].matchType === 'component') {
    //         title = 'Components';
    //       }
    //     });
    //   }
    // }
    //
    // return (
    //   <div className="section-list-component">
    //     {
    //       groupedResults.map((groupedResult) => {
    //         console.log(groupedResult);
    //         let title;
    //         if (groupedResult[0].matchType === 'section') {
    //           title = 'Sectionsx';
    //         } else if (groupedResult[0].matchType === 'component') {
    //           title = 'Components';
    //         }
    //
    //         return (
    //           <div>
    //             <h3>{title}</h3>
    //             <ul>
    //               {groupedResult.map((result) => {
    //                 return <li>{section}</li>;
    //               })}
    //             </ul>
    //           </div>
    //         );
    //       })
    //     }
    //   </div>
    // );
  }
});

module.exports = SearchListComponent;
