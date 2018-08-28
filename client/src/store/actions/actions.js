import getAuthActions from './auth';
import getUploadImageActions from './uploadImage';
import getDataLoadActions from './dataLoad';

const ActionType = {
  INIT_USER_FROM_LSTORAGE: 'INIT_USER_FROM_LSTORAGE',
  GET_USER_FROM_LSTORAGE: 'GET_USER_FROM_LSTORAGE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  START_LOAD_DATA: 'START_LOAD_DATA',
  END_LOAD_DATA: 'END_LOAD_DATA',
  SELECT_IMAGE: 'SELECT_IMAGE',
  INIT_UPLOAD_IMAGE: 'INIT_UPLOAD_IMAGE',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  CLEAR_IMAGE: 'CLEAR_IMAGE',
  START_EDIT_POST: 'START_EDIT_POST',
  END_EDIT_POST: 'END_EDIT_POST'
};

export const Actions = {
  ...getAuthActions(ActionType),
  ...getUploadImageActions(ActionType),
  ...getDataLoadActions(ActionType)
};

export default ActionType;
