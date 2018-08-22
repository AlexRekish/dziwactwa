import getAuthActions from './auth';

const ActionType = {
  GET_USER_FROM_LSTORAGE: 'GET_USER_FROM_LSTORAGE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

export const Actions = {
  ...getAuthActions(ActionType)
};

export default ActionType;
