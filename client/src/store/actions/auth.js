const getAuthActions = actionTypes => ({
  initUserFromLocalStorage: () => ({ type: actionTypes.INIT_USER_FROM_LSTORAGE }),
  getUserFromLocalStorage: user => ({ type: actionTypes.GET_USER_FROM_LSTORAGE, user }),
  login: user => ({ type: actionTypes.LOGIN, user }),
  logout: () => ({ type: actionTypes.LOGOUT })
});

export default getAuthActions;
