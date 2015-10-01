'use strict';

var React = require('react/addons');

var DropFileComponent = React.createClass({

  addImage: function() {
    console.log('adding image');
  },

  render: function () {
    var addImageButton = '';
    var googleDriveButton = '';

    if (this.props.isAdmin) {
      addImageButton = <button className="btn btn-default" onClick={this.addImage}>Add image</button>;
      googleDriveButton = <button id="google-button" className="btn btn-default" onClick={this.addFilesFromGoogleDrive}>Add from Google Drive</button>;
    }

    return (
        <div className="text-center">
          <p>Drop files here</p>
          <div className="downloadButtons btn-group">
            {addImageButton}
            {googleDriveButton}
          </div>
        </div>
      );
  }
});

module.exports = DropFileComponent;
