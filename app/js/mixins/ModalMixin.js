'use strict';

var React = require('react');
var DeleteModal = require('../components/DeleteModal');

var ModalMixin = {

  appendModalToBody(props) {
    var wrapper = document.body.appendChild(document.createElement('div'));
    React.render(React.createElement(DeleteModal, props), wrapper);
  }
};


module.exports = ModalMixin;
