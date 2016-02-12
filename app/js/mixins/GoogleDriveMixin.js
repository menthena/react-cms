'use strict';

let CLIENT_ID = '696135464587-peh56h3qlmpp77dsafkgmi4mlhgn2h4h.apps.googleusercontent.com';
let SCOPES = ['https://www.googleapis.com/auth/drive'];
// let developerKey = 'AIzaSyDRZpwa2jwiNNVqrDLID7sI0WiJrt-byaU';

let pickerApiLoaded = false;
let oauthToken;

const GoogleDriveMixin = {

  auth() {
    if (oauthToken === undefined) {
      gapi.load('auth', {callback: this.onAuthAPILoaded});
    }
  },

  onAuthAPILoaded() {
    window.gapi.auth.authorize(
    {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false
    },
    this.handleAuthResult);
  },

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
      this.createPicker();
    }
  },

  loadPicker() {
    gapi.load('picker', {callback: function onPickerApiLoad() {
      pickerApiLoaded = true;
      this.createPicker();
    }.bind(this)});
  },

  createPicker() {
    if (pickerApiLoaded && oauthToken) {
      let picker = new google.picker.PickerBuilder().
          addView(google.picker.ViewId.DOCS).
          setOAuthToken(oauthToken).
          setOrigin('http://localhost:3001').
          // setDeveloperKey(developerKey).
          setSize(640, 480).
          hideTitleBar().
          setCallback(this.pickerCallback).
          build();
      picker.setVisible(true);
    }
  },

  pickerCallback(data) {
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      let doc = data[google.picker.Response.DOCUMENTS][0];
      let url = doc[google.picker.Document.URL];
      console.log(doc);
      this.add({
          title: doc.name,
          url: url,
          size: doc.sizeBytes,
          last_updated: doc.lastEditedUtc,
          extension: doc.mimeType
        });
    }
  },

  addFilesFromGoogleDrive() {
    this.auth();
    this.loadPicker();
  },

  add(link) {
    this.addLinkFromDrive('link', link);
  }

};

module.exports = GoogleDriveMixin;
