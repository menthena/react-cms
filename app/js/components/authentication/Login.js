'use strict';

import React from 'react';

require('../../../styles/Login.sass');

const Login = React.createClass({

  render() {
    return (
      <div id='auth'>
        <div className='container container-narrow'>
          <div className='text-center'>
            <h1>Sign in to TAB HQ</h1>
            <a className="btn btn-lg btn-success" href="auth/google">
              <i className="fa fa-google fa-lg"></i> Login
            </a>
          </div>

          <script src='https://apis.google.com/js/platform.js' async defer></script>
          <meta name='google-signin-client_id' content='328354766394-2v20l3ggtoo2q69qttv07btohmhv2c6j.apps.googleusercontent.com'></meta>

          <div className='g-signin2' data-onsuccess='onSignIn'></div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
