'use strict';

var React = require('react/addons');
var CategoryActionCreators = require('../../actions/CategoryActionCreators');

require('../../../styles/NewCategory.sass');

var NewCategory = React.createClass({

  getInitialState() {
    return {
      categoryName: ''
    };
  },

  handleSubmit(e) {
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

  render: function() {
    if (this.props.userIsAdmin) {
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
    } else {
      return null;
    }
  }
});

module.exports = NewCategory;
