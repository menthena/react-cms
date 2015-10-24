'use strict';

import React from 'react/addons';
import CategoryActionCreators from '../../actions/CategoryActionCreators';

require('../../../styles/NewCategory.sass');

const NewCategory = React.createClass({

  getInitialState() {
    return {
      categoryName: ''
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    let categoryName = this.state.categoryName;
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

  render() {
    if (this.props.userIsAdmin) {
      return (
        <form onSubmit={this.handleSubmit}>
          <h3 className='new-category'>
            <div className='actions right'>
              <i className='fa fa-plus'></i>
            </div>
            <input type='text' onChange={this.handleChange} placeholder='Add new category' maxLength='20' name='title' value={this.state.categoryName} />
          </h3>
        </form>
      );
    } else {
      return null;
    }
  }
});

module.exports = NewCategory;
