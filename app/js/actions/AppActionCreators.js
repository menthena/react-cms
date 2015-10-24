'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

let AppActions = Reflux.createActions([
  'search',
  'closeSearchView',
  'receiveSearchResults',
  'receiveUnauthorizedUser'
]);

AppActions.search.listen(function(query) {
  Api.search(query);
});

export default AppActions;
