'use strict';

import React from 'react';
import Accordion from './Accordion';

require('../../../styles/Menu.sass');

let scrollStyles;

const Menu = React.createClass({

  setStylesOnScrollSection() {
    let logo = this.refs.logo;
    scrollStyles = { height: window.innerHeight - logo.offsetHeight };
  },

  handleResize() {
    this.setStylesOnScrollSection();
  },

  componentDidMount() {
    this.setStylesOnScrollSection();
    window.addEventListener('resize', this.handleResize);
  },

  render() {
    let categories = this.props.categories;
    let user = this.props.user;

    return (
        <div id='menu'>
          <div id='menu-inner'>
            <div id='menu-left'>
              <img alt='Logo' src='../images/logo.gif'/>
            </div>
            <div id='menu-right'>
              <div id='logo' ref='logo'>
                <h3>The App Business</h3>
                <p>{user.displayName}</p>
              </div>
              <div className='scroll' style={scrollStyles}>
                <Accordion selectedSection={this.props.selectedSection} userIsAdmin={this.props.userIsAdmin} categories={categories} />
              </div>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = Menu;
