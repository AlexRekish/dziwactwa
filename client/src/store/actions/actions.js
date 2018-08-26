import getAuthActions from './auth';
import getUploadImageActions from './uploadImage';

const ActionType = {
  GET_USER_FROM_LSTORAGE: 'GET_USER_FROM_LSTORAGE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SELECT_IMAGE: 'SELECT_IMAGE',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  CLEAR_IMAGE: 'CLEAR_IMAGE',
  START_EDIT_POST: 'START_EDIT_POST',
  END_EDIT_POST: 'END_EDIT_POST'
};

export const Actions = {
  ...getAuthActions(ActionType),
  ...getUploadImageActions(ActionType)
};

export default ActionType;
