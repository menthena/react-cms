var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_UNAUTHORIZED_USER: null,
    RECEIVE_SEARCH_RESULTS: null,
    SEARCH: null,
    CLOSE_SEARCH_VIEW: null
  })

};
