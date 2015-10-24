'use strict';

import React from 'react/addons';
import Category from './Category';
import ReorderMixin from '../../mixins/ReorderMixin';
import NewCategory from './NewCategory';
import CategoryActionCreators from '../../actions/CategoryActionCreators';
import _ from 'lodash';

let Accordion = React.createClass({
  mixins: [ReorderMixin],

  getInitialState: function() {
    return {
      visibleCategory: null,
      activeMenuSection: {}
    };
  },

  setDraggableData: function(categories) {
    CategoryActionCreators.updateCategories(categories);
  },

  handleClick: function(category) {
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

  render: function() {

    let categories = [];
    let items = this.props.categories;
    let currentSection = this.props.currentSection;
    let userIsAdmin = this.props.userIsAdmin;

    this.loadDraggableData(this.props.categories);

    items = _.sortBy(items, 'order');
    items.map(function(item) {
      categories.push(<Category key={item.id} userIsAdmin={userIsAdmin} category={item} currentSection={currentSection} mouseDown={this.mouseDown} dragEnd={this.dragEnd} dragStart={this.dragStart} />);
    }.bind(this));

    return (
        <div id='categories' className='Accordion' onDragOver={this.dragOver}>
          {categories}
          <NewCategory userIsAdmin={userIsAdmin} />
        </div>
      );
  }
});

module.exports = Accordion;
