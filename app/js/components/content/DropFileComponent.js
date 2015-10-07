'use strict';

var React = require('react/addons');
var GoogleDriveMixin = require('../../mixins/GoogleDriveMixin');

var DropFileComponent = React.createClass({
  mixins: [GoogleDriveMixin],

  uploadFile(e) {
    console.log(e);
  },

  render: function () {
    var addLinkButton = '';
    var googleDriveButton = '';
    var classes = "downloadButtons";

    if (this.props.type === 'link') {
      addLinkButton = <button className="btn btn-default" onClick={this.props.addLink}>Add link</button>;
      classes += " btn-group";
    }
    googleDriveButton = <button id="google-button" className="btn btn-default" onClick={this.addFilesFromGoogleDrive}>Add from Google Drive</button>;

    if (this.props.userIsAdmin) {
      return (
          <div className="text-center dropzone">
            <a href="#">
              <i className="fa fa-cloud-upload fa-3x" />
            </a>
            <h3>Drag & Drop</h3>
            <p>or <a href="#">browse</a></p>
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
