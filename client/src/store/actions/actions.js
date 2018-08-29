import getAuthActions from './auth';
import getUploadImageActions from './uploadImage';
import getDataLoadActions from './dataLoad';
import getBlogActions from './blog';
import getUsersActions from './users';

const ActionType = {
  INIT_USER_FROM_LSTORAGE: 'INIT_USER_FROM_LSTORAGE',
  GET_USER_FROM_LSTORAGE: 'GET_USER_FROM_LSTORAGE',
  INIT_LOGIN: 'INIT_LOGIN',
  LOGIN: 'LOGIN',
  LOGIN_WITH_JWT: 'LOGIN_WITH_JWT',
  LOGOUT: 'LOGOUT',

  REGISTER: 'REGISTER',

  START_LOAD_DATA: 'START_LOAD_DATA',
  END_LOAD_DATA: 'END_LOAD_DATA',

  START_LOAD_POSTS: 'START_LOAD_BLOG_POSTS',
  LOAD_POSTS_SUCCEED: 'LOAD_POSTS_SUCCEED',
  LOAD_POSTS_FAILED: 'LOAD_POSTS_FAILED',

  START_LOAD_POST: 'START_LOAD_POST',
  LOAD_POST_SUCCEED: 'LOAD_POST_SUCCEED',
  LOAD_POST_FAILED: 'LOAD_POST_FAILED',

  START_DELETE_POST: 'START_DELETE_POST',
  DELETE_POST_SUCCEED: 'DELETE_POST_SUCCEED',
  DELETE_POST_FAILED: 'DELETE_POST_FAILED',

  START_ADD_POST: 'START_ADD_POST',

  SELECT_IMAGE: 'SELECT_IMAGE',
  INIT_UPLOAD_IMAGE: 'INIT_UPLOAD_IMAGE',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  CLEAR_IMAGE: 'CLEAR_IMAGE',

  START_EDIT_POST: 'START_EDIT_POST',
  EDIT_POST: 'EDIT_POST',
  END_EDIT_POST: 'END_EDIT_POST'
};

export const Actions = {
  ...getAuthActions(ActionType),
  ...getUploadImageActions(ActionType),
  ...getDataLoadActions(ActionType),
  ...getBlogActions(ActionType),
  ...getUsersActions(ActionType)
};

export default ActionType;
