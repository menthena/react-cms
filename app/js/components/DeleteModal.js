'use strict';

import React from 'react';
let Modal = require('react-bootstrap').Modal;
let OverlayTrigger = require('react-bootstrap').OverlayTrigger;

require('../../styles/Modal.sass');

const DeleteModal = React.createClass({

  getInitialState() {
    return {
      showModal: false
    };
  },

  open() {
    this.setState({
      showModal: true
    });
  },

  close() {
    this.setState({
      showModal: false
    });
  },

  componentWillMount() {
    this.open();
  },

  clickHandler() {
    this.props.actions();
    this.close();
  },

  render() {

    return (
      <div>
        <Modal bsSize='medium' show={this.state.showModal} onHide={this.close}>
          <Modal.Body className='text-center'>
            <h4>{this.props.text}</h4>
            <p>Click delete to continue</p>
          </Modal.Body>
          <Modal.Footer>
            <div className='text-center'>
              <button className='btn btn-default' onClick={this.close}>Cancel</button>
              <button className='btn btn-danger' onClick={this.clickHandler}>
                <span className='glyphicon glyphicon-trash'></span> Delete
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
});

module.exports = DeleteModal;
