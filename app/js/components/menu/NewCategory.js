'use strict';

var React = require('react/addons');
var AppActions = require('../../actions/AppActions');
var CategoryActionCreators = require('../../actions/CategoryActionCreators');

require('../../../styles/NewCategory.sass');

var NewCategory = React.createClass({

  getInitialState() {
    return {
      categoryName: ''
    };
  },

  handleSubmit(e, order) {
    // var numberOfExistingCategories = this.props.categories.length;
    // e.preventDefault();
    // AppActions.addNewCategory(this.state.title, numberOfExistingCategories);
    // this.setState({
    //   title: ''
    // });
    e.preventDefault();
    var categoryName = this.state.categoryName;
    if (categoryName) {
      CategoryActionCreators.createCategory(categoryName);
      this.setState({
        categoryName: ''
      });
    }
  },

  handleChange(event) {
    this.setState({
      categoryName: event.target.value
    });
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="new-category">
          <div className="actions right">
            <i className="fa fa-plus"></i>
          </div>
          <input type="text" onChange={this.handleChange} placeholder="Add new category" maxLength="20" name="title" value={this.state.categoryName} />
        </h3>
      </form>
    );
  }
});

module.exports = NewCategory;
