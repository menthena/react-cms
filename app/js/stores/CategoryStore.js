'use strict';

import CategoryActions from '../actions/CategoryActionCreators';
import ServerActions from '../actions/ServerActionCreators';
import SectionActions from '../actions/SectionActionCreators';
import Reflux from 'reflux';
import _ from 'lodash';

let category;
let _categories = [];

const CategoryStore = Reflux.createStore({
  listenables: [CategoryActions, SectionActions, ServerActions],

  onReceiveAllCategories(rawCategories) {
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

  onReceiveCreatedSection(categoryId, section) {
    category = _.find(_categories, { id: categoryId });
    category.sections.push(section);
    this.trigger();
  },

  onReceiveDeletedSection(categoryId, sectionId) {
    category = _.find(_categories, { id: categoryId });
    _.remove(category.sections, { id: sectionId });
    this.trigger();
  },

  onReceiveUpdatedSection(rawSection) {
    _.each(_categories, (category) => {
      _.find(category.sections, (section, index) => {
        if (section.id === rawSection.id) {
          category.sections[index] = rawSection;
        }
      });
    });
    this.trigger();
  },

  onReceiveUpdatedSections(categoryId, rawSections) {
    category = _.find(_categories, { id: categoryId });
    category.sections = rawSections;
    this.trigger();
  },

  getCategories() {
    return _categories;
  },

  getAll() {
    return _categories;
  }
});

export default CategoryStore;
