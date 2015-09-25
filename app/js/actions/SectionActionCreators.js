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

  deleteSection: function(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_SECTION,
      id: id
    });
    Api.deleteSection(id);
  },

  updateSection: function(id, data) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_SECTION,
      id: id,
      data: data
    });
    Api.updateSection(id, data);
  },

  updateSections: function(sections) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_SECTIONS,
      sections: sections
    });
    Api.updateSections(sections);
  }

};
