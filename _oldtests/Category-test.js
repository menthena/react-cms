'use strict';

import React from 'react';
import Category from '../Category.js';
import TestUtils from 'react/lib/ReactTestUtils';

describe('Accordion', function() {

  let category = {
    title : 'Home',
    sections: []
  };

  var CategoryElement = TestUtils.renderIntoDocument(<Category category={category} />);

  // describe('getInitialState()', function() {
  //   it('visibleCategory must be null', function() {
  //     expect(Category.state.visibleCategory).to.equal(null);
  //   });
  // });

  describe('handleClick()', function() {

    var accordionItem = TestUtils.scryRenderedDOMComponentsWithTag(CategoryElement, 'h3')[0];

    it('isVisible should be false by default', function() {
      expect(CategoryElement.state.isVisible).to.equal(false);
      TestUtils.Simulate.click(accordionItem);
      expect(CategoryElement.state.isVisible).to.equal(true);
    });
  });

});
