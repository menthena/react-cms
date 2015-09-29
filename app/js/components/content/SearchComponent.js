'use strict';

var React = require('react/addons');
var SectionActionCreators = require('../../actions/SectionActionCreators');

var SearchComponent = React.createClass({

  getInitialState() {
    return {
      query: ''
    };
  },

  handleSearch(e) {
    e.preventDefault();
    SectionActionCreators.searchSections(this.state.query);
  },

  handleChange(e) {
    var value = e.target.value;
    this.setState({
      query: value
    });
  },

  render: function () {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input value={this.state.query} onChange={this.handleChange} placeholder="Search..." />
        </form>
      </div>
    );
  }
});

module.exports = SearchComponent;
