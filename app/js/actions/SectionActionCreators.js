'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var SectionConstants = require('../constants/SectionConstants');
var Api = require('../utils/Api');

var ActionTypes = SectionConstants.ActionTypes;

module.exports = {

  createSection: function(categoryId, name) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_SECTION,
      category_id: categoryId,
      name: name
    });
    Api.createSection(categoryId, name);
  },

  deleteSection: function(categoryId, sectionId) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_SECTION,
      category_id: categoryId,
      section_id: sectionId
    });
    Api.deleteSection(categoryId, sectionId);
  },

  updateSection: function(categoryId, sectionId, data) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_SECTION,
      category_id: categoryId,
      section_id: sectionId,
      data: data
    });
    Api.updateSection(categoryId, sectionId, data);
  },

  updateSections: function(categoryId, sections) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_SECTIONS,
      category_id: categoryId,
      sections: sections
    });
    Api.updateSections(categoryId, sections);
  }

};
