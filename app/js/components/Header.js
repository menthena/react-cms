'use strict';

import React from 'react';
import SearchInputComponent from './search/SearchInputComponent';

require('../../styles/Header.sass');

const Header = React.createClass({

  render() {

    return (
        <nav className='navbar navbar-fixed-top'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed pull-left' onClick={this.props.toggleMobilePanel}>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <SearchInputComponent />
          </div>
          <ul className='nav navbar-bar navbar-right'>
            <li>
              <button className='pull-right' onClick={this.props.toggleAdminMode}>toggle admin mode</button>
            </li>
          </ul>
        </nav>
      );
  }
});

module.exports = Header;
