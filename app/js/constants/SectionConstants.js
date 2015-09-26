var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_CREATED_SECTION: null,
    CREATE_SECTION: null,
    DELETE_SECTION: null,
    UPDATE_SECTION: null,
    RECEIVE_UPDATED_SECTION: null,
    RECEIVE_UPDATED_SECTIONS: null,
    RECEIVE_DELETED_SECTION: null
  })

};
