'use strict';

var React = require('react/addons');
var AppActions = require('../../actions/AppActions');

var NewSection = React.createClass({

  getInitialState() {
    return {
      title: ''
    };
  },

  handleSubmit(e) {
    var numberOfExistingSections = this.props.sections.length;
    e.preventDefault();
    AppActions.addNewSection(this.props.categoryID, this.state.title, numberOfExistingSections);
    this.setState({
      title: ''
    });
  },

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="new-category">
          <div className="actions right">
            <i className="fa fa-plus"></i>
          </div>
          <input type="text" onChange={this.handleChange} placeholder="Add new section" maxLength="20" name="title" value={this.state.title} />
        </h3>
      </form>
    );
  }
});

module.exports = NewSection;
