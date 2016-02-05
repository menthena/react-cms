'use strict';

import React from 'react';
import Category from './Category';
import ReorderMixin from '../../mixins/ReorderMixin';
import NewCategory from './NewCategory';
import CategoryActionCreators from '../../actions/CategoryActionCreators';
import _ from 'lodash';

const Accordion = React.createClass({
  mixins: [ReorderMixin],

  getInitialState() {
    return {
      visibleCategory: null,
      activeMenuSection: {}
    };
  },

  setDraggableData(categories) {
    CategoryActionCreators.updateCategories(categories);
  },

  handleClick(category) {
    if (this.state.visibleCategory !== category) {
      this.setState({
        visibleCategory: category
      });
    } else {
      this.setState({
        visibleCategory: null
      });
    }
  },

  render() {

    let categories = [];
    let items = this.props.categories;
    let userIsAdmin = this.props.userIsAdmin;

    this.loadDraggableData(this.props.categories);

    items = _.sortBy(items, 'order');
    items.map((item) => {
      categories.push(<Category selectedSection={this.props.selectedSection} key={item.id} userIsAdmin={userIsAdmin} category={item} mouseDown={this.mouseDown} dragEnd={this.dragEnd} dragStart={this.dragStart} />);
    });

    return (
        <div id='categories' className='Accordion' onDragOver={this.dragOver}>
          {categories}
          <NewCategory userIsAdmin={userIsAdmin} />
        </div>
      );
  }
});

module.exports = Accordion;
