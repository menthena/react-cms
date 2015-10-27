'use strict';

import _ from 'lodash';
import ComponentActions from '../actions/ComponentActionCreators';
import ServerActions from '../actions/ServerActionCreators';
import Reflux from 'reflux';

let _components = [];

function _addComponents(rawComponents) {
  _components = _components.concat(rawComponents);
}

const ComponentStore = Reflux.createStore({
  listenables: [ComponentActions, ServerActions],

  onReceiveAllComponents(rawComponents) {
    _addComponents(rawComponents);
    this.trigger();
  },

  onReceiveCreatedComponent(rawComponent) {
    _components.push(rawComponent);
    this.trigger();
  },

  onReceiveDeletedComponent(componentId) {
    _.remove(_components, { id: componentId });
    this.trigger();
  },

  onReceiveUpdatedComponent(componentId, data) {
    _.find(_components, function(component) {
      if (component.id === componentId) {
        component.data = data.data;
      }
    });
    this.trigger();
  },

  onReceiveUpdatedComponents(rawComponents) {
    _components = rawComponents;
    this.trigger();
  },

  getAllBySectionId(sectionId) {
    return _.where(_components, { sectionid: sectionId });
  },

  getAll() {
    return _components;
  }
});

export default ComponentStore;
