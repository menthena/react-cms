'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

const AppActions = Reflux.createActions([
  'search',
  'closeSearchView',
  'receiveSearchResults',
  'receiveUnauthorizedUser',
  'scrollToSection',
  'setSelectedSection'
]);

AppActions.search.listen((query) => {
  Api.search(query);
});

export default AppActions;
