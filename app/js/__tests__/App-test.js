'use strict';

import React from 'react';
import {History} from 'react-router';
import App  from '../App.js';
import AppStore from '../stores/AppStore';
import TestUtils from 'react/lib/ReactTestUtils';

describe('App', function() {

  var AppElement = TestUtils.renderIntoDocument(<App />);

  describe('getInitialState()', function() {

    it('allCategories should be an empty array', function() {
      expect(AppElement.getInitialState().allCategories.length).to.equal(0);
    });

    it('userIsAdmin should be false', function() {
      expect(AppElement.state.userIsAdmin).to.be.false;
    });

  });

  describe('toggleAdminMode()', function() {

    it('userIsAdmin should be true', function() {
      AppElement.toggleAdminMode();
      expect(AppElement.state.userIsAdmin).to.be.true;
    });

    it('userIsAdmin should be false', function() {
      AppElement.setState({
        userIsAdmin: true
      });
      AppElement.toggleAdminMode();
      expect(AppElement.state.userIsAdmin).to.be.false;
    });

  });

  describe('_onChange()', function() {
    AppElement.history = {
      pushState: function() {
        self.location = '#login';
      }
    };
    AppStore.setAuthorizedStatus(true);
    AppElement._onChange();
    expect(window.location.hash).to.equal('#login');
  });

  describe('toggleMobilePanel()', function() {

    var mobilePanelButton = TestUtils.scryRenderedDOMComponentsWithClass(AppElement, 'navbar-toggle')[0];
    var pageContainer = TestUtils.scryRenderedDOMComponentsWithClass(AppElement, 'off-canvas-wrap')[0];

    it('Closed mobile panel', function() {
      expect(pageContainer.classList.toString()).not.to.contain('move-right');
    });

    it('Open mobile panel', function() {
      TestUtils.Simulate.click(mobilePanelButton);
      expect(pageContainer.classList.toString()).to.contain('move-right');
    });

  });

});
