import keyMirror from 'keymirror';

module.exports = {

  ActionTypes: keyMirror({
    CREATE_COMPONENT: null,
    DELETE_COMPONENT: null,
    RECEIVE_RAW_COMPONENTS: null,
    RECEIVE_CREATED_COMPONENT: null,
    RECEIVE_DELETED_COMPONENT: null,
    RECEIVE_UPDATED_COMPONENT: null,
    RECEIVE_UPDATED_COMPONENTS: null
  })

};
