'use strict';

var React = require('react/addons');
var AppActions = require('../../actions/AppActions');

require('../../../styles/NewCategory.sass');

var NewCategory = React.createClass({

  getInitialState() {
    return {
      title: ''
    };
  },

  handleSubmit(e) {
    var numberOfExistingCategories = this.props.categories.length;
    e.preventDefault();
    AppActions.addNewCategory(this.state.title, numberOfExistingCategories);
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
          <input type="text" onChange={this.handleChange} placeholder="Add new category" maxLength="20" name="title" value={this.state.title} />
        </h3>
      </form>
    );
  }
});

module.exports = NewCategory;
