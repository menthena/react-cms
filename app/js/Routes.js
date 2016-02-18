'use strict';

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Api from './utils/Api';
import Login from './components/authentication/Login';
import App from './App';

Api.getAllCategories();
Api.getUser();

export default (
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/section/:sectionId' component={App}/>
    <Route path='/login' component={Login}/>
  </Router>
);
