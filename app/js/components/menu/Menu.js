'use strict';

import React from 'react';
import Accordion from './Accordion';

require('../../../styles/Menu.sass');

const Menu = React.createClass({

  render() {
    let categories = this.props.categories;
    let currentSection = this.props.currentSection;

    return (
        <div id='menu'>
          <div id='menu-inner'>
            <div id='logo'>
              <img alt='Logo' src='../images/logo.gif'/>
              <h3>Resource centre test</h3>
              <h4>Beta v0.1</h4>
            </div>
            <div className='scroll'>
              <Accordion userIsAdmin={this.props.userIsAdmin} categories={categories} currentSection={currentSection}/>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = Menu;
