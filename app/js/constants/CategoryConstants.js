var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_CATEGORIES: null,
    CREATE_CATEGORY: null,
    RECEIVE_CREATED_CATEGORY: null,
    RECEIVE_UPDATED_CATEGORY: null,
    RECEIVE_UPDATED_CATEGORIES: null
  })

};
