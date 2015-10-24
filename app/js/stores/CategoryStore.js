'use strict';

import CategoryActions from '../actions/CategoryActionCreators';
import Reflux from 'reflux';
import _ from 'lodash';

let category;
let _categories = [];

const CategoryStore = Reflux.createStore({
  listenables: [CategoryActions],

  onReceiveCategories(rawCategories) {
    _categories = rawCategories;
    this.trigger();
  },

  onReceiveCreatedCategory(rawCategory) {
    _categories.push(rawCategory);
    this.trigger();
  },

  onReceiveUpdatedCategory(rawCategory) {
    _.each(_categories, (category, index) => {
      if (category.id === rawCategory.id) {
        _categories[index].title = rawCategory.title;
      }
    });
    this.trigger();
  },

  onReceiveUpdatedCategories(rawCategories) {
    _categories = rawCategories;
    this.trigger();
  },

  onReceiveDeletedCategory(categoryId) {
    _.remove(_categories, { id: categoryId });
    this.trigger();
  },

  onReceiveCreatedSection(params) {
    category = _.find(_categories, { id: params.category_id });
    category.sections.push(params.section);
    this.trigger();
  },

  onReceiveDeletedSection(params) {
    category = _.find(_categories, { id: params.category_id });
    _.remove(category.sections, { id: params.section_id });
    this.trigger();
  },

  onReceiveUpdateSection(rawSection) {
    _.each(_categories, function(category) {
      _.find(category.sections, function(section, index) {
        if (section.id === rawSection.id) {
          category.sections[index] = action.rawSection;
        }
      });
    });
    this.trigger();
  },

  onReceiveUpdatedSections(params) {
    category = _.find(_categories, { id: params.category_id });
    category.sections = params.rawSections;
    this.trigger();
  },

  getCategories() {
    return _categories;
  }
});

export default CategoryStore;
