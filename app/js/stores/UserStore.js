'use strict';

import ServerActions from '../actions/ServerActionCreators';
import Reflux from 'reflux';
import _ from 'lodash';

let user = {};

const UserStore = Reflux.createStore({
  listenables: [ServerActions],

  onReceiveUser(rawUser) {
    user = rawUser;
    this.trigger();
  },

  getUser() {
    return user;
  }
});

export default UserStore;
