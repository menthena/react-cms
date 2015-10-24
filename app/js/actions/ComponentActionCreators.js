'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

let ComponentActionCreator = Reflux.createActions([
  'createComponent',
  'deleteComponent',
  'updateComponent',
  'updateComponents'
]);

ComponentActionCreator.createComponent.listen(function(sectionId, type, data) {
  Api.createComponent(sectionId, type, data);
});

ComponentActionCreator.deleteComponent.listen(function(id) {
  Api.deleteComponent(id);
});

ComponentActionCreator.updateComponent.listen(function(id, data) {
  Api.updateComponent(id, data);
});

ComponentActionCreator.updateComponents.listen(function(components) {
  Api.updateComponents(components);
});

export default ComponentActionCreator;
