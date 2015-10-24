'use strict';

var React = require('react/addons');
var SectionActionCreators = require('../../actions/SectionActionCreators');

var NewSection = React.createClass({

  getInitialState() {
    return {
      sectionName: ''
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    var categoryId = this.props.categoryId;
    var sectionName = this.state.sectionName;
    if (sectionName) {
      SectionActionCreators.createSection(categoryId, sectionName);
      this.setState({
        sectionName: ''
      });
    }
  },

  handleChange(event) {
    this.setState({
      sectionName: event.target.value
    });
  },

  render: function() {
    if (this.props.userIsAdmin) {
      return (
        <form onSubmit={this.handleSubmit}>
          <h3 className="new-category">
            <div className="actions right">
              <i className="fa fa-plus"></i>
            </div>
            <input type="text" onChange={this.handleChange} placeholder="Add new section" maxLength="20" name="title" value={this.state.sectionName} />
          </h3>
        </form>
      );
    } else {
      return null;
    }
  }
});

module.exports = NewSection;
