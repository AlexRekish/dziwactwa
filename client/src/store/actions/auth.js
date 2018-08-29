const getAuthActions = actionTypes => ({
  initUserFromLocalStorage: () => ({ type: actionTypes.INIT_USER_FROM_LSTORAGE }),
  getUserFromLocalStorage: user => ({ type: actionTypes.GET_USER_FROM_LSTORAGE, user }),
  initLogin: (email, password, history) => ({
    type: actionTypes.INIT_LOGIN,
    email,
    password,
    history
  }),
  login: user => ({ type: actionTypes.LOGIN, user }),
  loginWithJwt: user => ({ type: actionTypes.LOGIN_WITH_JWT, user }),
  logout: () => ({ type: actionTypes.LOGOUT })
});

export default getAuthActions;
