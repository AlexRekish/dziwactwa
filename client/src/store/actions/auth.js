import { getCurrentUser } from '../../services/authService';

const getAuthActions = actionTypes => ({
  getUserFromLocalStorage: () => dispatch => {
    const user = getCurrentUser();
    dispatch({ type: actionTypes.GET_USER_FROM_LSTORAGE, user });
  },
  login: user => ({ type: actionTypes.LOGIN, user }),
  logout: () => ({ type: actionTypes.LOGOUT })
});

export default getAuthActions;
