'use strict';

import React from 'react/addons';
import GoogleDriveMixin from '../../mixins/GoogleDriveMixin';

let DropFileComponent = React.createClass({
  mixins: [GoogleDriveMixin],

  uploadFile(e) {
    console.log(e);
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
            <p>or <a href='#'>browse</a></p>
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
