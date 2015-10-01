'use strict';

var React = require('react/addons');

var DropFileComponent = React.createClass({

  addFilesFromGoogleDrive: function() {
    console.log('adding image');
  },

  test(e) {
    console.log(e);
  },

  render: function () {
    var action = '';
    var googleDriveButton = '';
    var classes = this.props.type === 'link' ? 'downloadButtons btn-group' : '';

    if (this.props.isAdmin) {
      if (this.props.type === 'image') {
        action = <input type="file" onChange={this.test} />;
      } else {
        action = <button className="btn btn-default" onClick={this.props.addLink}>Add link</button>;
      }
      googleDriveButton = <button id="google-button" className="btn btn-default" onClick={this.addFilesFromGoogleDrive}>Add from Google Drive</button>;
    }

    return (
        <div className="text-center">
          <p>Drop files here</p>
          <div className={classes}>
            {action}
            {googleDriveButton}
          </div>
        </div>
      );
  }
});

module.exports = DropFileComponent;
