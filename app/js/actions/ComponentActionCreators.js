'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

const ComponentActionCreator = Reflux.createActions([
  'createComponent',
  'deleteComponent',
  'updateComponent',
  'updateComponents'
]);

ComponentActionCreator.createComponent.listen((sectionId, type, data) => {
  Api.createComponent(sectionId, type, data);
});

ComponentActionCreator.deleteComponent.listen((id) => {
  Api.deleteComponent(id);
});

ComponentActionCreator.updateComponent.listen((id, data) => {
  Api.updateComponent(id, data);
});

ComponentActionCreator.updateComponents.listen((components) => {
  Api.updateComponents(components);
});

export default ComponentActionCreator;
