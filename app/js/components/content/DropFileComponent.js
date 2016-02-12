'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import GoogleDriveMixin from '../../mixins/GoogleDriveMixin';

const DropFileComponent = React.createClass({
  mixins: [GoogleDriveMixin],

  uploadFile(e) {
    // console.log(e);
  },

  addLinkFromDrive(elem, params) {
    this.props.addLinkFromDrive(elem, params);
  },

  triggerFileUpload() {
    let uploadField = this.refs.upload;
    uploadField.click();
  },

  fileUploaded(event) {
    console.log(event);
  },

  render() {
    let addLinkButton = '';
    let googleDriveButton = '';
    let classes = 'downloadButtons';

    if (this.props.type === 'link') {
      addLinkButton = <button className='btn btn-default' onClick={this.props.addLink}>Add link</button>;
      classes += ' btn-group';
    }
    googleDriveButton = <button id='google-button' className='btn btn-default' onClick={this.addFilesFromGoogleDrive}>Add from Google Drive</button>;

    if (this.props.userIsAdmin) {
      return (
          <div className='text-center dropzone'>
            <a href='#'>
              <i className='fa fa-cloud-upload fa-3x' />
            </a>
            <h3>Drag & Drop</h3>
            <input id="upload" onChange={this.fileUploaded} type="file" ref='upload' style={{display: 'none'}} />
            <p>or <a href='#' onClick={this.triggerFileUpload}>browse</a></p>
            <div className={classes}>
              {addLinkButton}
              {googleDriveButton}
            </div>
           </div>
        );
    } else {
      return null;
    }
  }
});

module.exports = DropFileComponent;
