'use strict';

var React = require('react/addons');
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;

require('../../styles/DeletePrompt.sass');

var DeletePrompt = React.createClass({

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

  deleteAction() {
    this.props.deleteAction();
    this.close();
  },

  componentWillUnmount() {
    this.close();
  },

  render: function () {

    return (
      <div>
        <Modal bsSize="medium" show={this.state.showModal} onHide={this.close}>
          <Modal.Body className="text-center">
            <h4>Are you sure you want to delete this?</h4>
            <p>This change cannot be undone</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              <button className="btn btn-default" onClick={this.close}>Cancel</button>
              <button className="btn btn-danger" onClick={this.deleteAction}>Continue</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
});

module.exports = DeletePrompt;
