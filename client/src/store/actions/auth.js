export const AuthAction = {
  INIT_USER_FROM_LSTORAGE: 'INIT_USER_FROM_LSTORAGE',
  GET_USER_FROM_LSTORAGE: 'GET_USER_FROM_LSTORAGE',
  INIT_LOGIN: 'INIT_LOGIN',
  LOGIN: 'LOGIN',
  LOGIN_WITH_JWT: 'LOGIN_WITH_JWT',
  LOGOUT: 'LOGOUT'
};

const getAuthActions = () => ({
  initUserFromLocalStorage: () => ({ type: AuthAction.INIT_USER_FROM_LSTORAGE }),
  getUserFromLocalStorage: user => ({ type: AuthAction.GET_USER_FROM_LSTORAGE, user }),
  initLogin: (email, password, history) => ({
    type: AuthAction.INIT_LOGIN,
    email,
    password,
    history
  }),
  login: user => ({ type: AuthAction.LOGIN, user }),
  loginWithJwt: user => ({ type: AuthAction.LOGIN_WITH_JWT, user }),
  logout: () => ({ type: AuthAction.LOGOUT })
});

export default getAuthActions;
