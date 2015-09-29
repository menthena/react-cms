'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var ComponentConstants = require('../constants/ComponentConstants');
var Api = require('../utils/Api');

var ActionTypes = ComponentConstants.ActionTypes;

module.exports = {

  createComponent: function(sectionId, type, data) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_COMPONENT,
      section_id: sectionId,
      component_type: type,
      data: data
    });
    Api.createComponent(sectionId, type, data);
  },

  deleteComponent: function(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_COMPONENT,
      id: id
    });
    Api.deleteComponent(id);
  },

  updateComponent: function(id, data) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_COMPONENT,
      id: id,
      data: data
    });
    Api.updateComponent(id, data);
  },

  updateComponents: function(components) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_COMPONENTS,
      components: components
    });
    Api.updateComponents(components);
  }

};
