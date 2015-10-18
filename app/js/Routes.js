'use strict';

import React                       from 'react/addons';
import {Router, Route, IndexRoute} from 'react-router';
import CreateBrowserHistory        from 'react-router/node_modules/history/lib/createBrowserHistory';

import Api                         from './utils/Api';
import Login                       from './components/authentication/Login';
import App                         from './App';

Api.getAllCategories();

export default (
  <Router history={CreateBrowserHistory()}>
    <Route path="/" component={App} />
    <Route path="/section/:sectionId" component={App}/>
    <Route path="/login" component={Login}/>
  </Router>
);
