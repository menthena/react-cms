'use strict';

import Reflux from 'reflux';

const ServerActions = Reflux.createActions([
  'receiveAllCategories',
  'receiveCreatedCategory',
  'receiveUpdatedCategory',
  'receiveUpdatedCategories',
  'receiveDeletedCategory',
  'receiveCreatedSection',
  'receiveUpdatedSection',
  'receiveUpdatedSections',
  'receiveDeletedSection',
  'receiveAllComponents',
  'receiveCreatedComponent',
  'receiveUpdatedComponent',
  'receiveDeletedComponent',
  'receiveSearchResults',
  'receiveUpdatedComponents',
  'receiveUnauthorizedUser'
]);

export default ServerActions;
