'use strict';

import React from 'react';
import DeleteModal from '../components/DeleteModal';

const ModalMixin = {

  appendModalToBody(props) {
    let wrapper = document.body.appendChild(document.createElement('div'));
    React.render(React.createElement(DeleteModal, props), wrapper);
  }
};

module.exports = ModalMixin;
