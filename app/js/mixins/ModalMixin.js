'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import DeleteModal from '../components/DeleteModal';

const ModalMixin = {

  appendModalToBody(props) {
    let wrapper = document.body.appendChild(document.createElement('div'));
    ReactDOM.render(React.createElement(DeleteModal, props), wrapper);
  }
};

module.exports = ModalMixin;
