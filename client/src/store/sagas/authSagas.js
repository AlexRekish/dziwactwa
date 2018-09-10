import { put, call } from 'redux-saga/effects';
import {
  getCurrentUser,
  login,
  loginWithJwt,
  checkJwtExp,
  refreshTokens,
  logout
} from '../../services/authService';
import { Actions } from '../actions/actions';
import http from '../../services/httpService';

export function* checkExpSaga(action) {
  const { user } = action;
  const detector = user ? !checkJwtExp(user.exp) : !checkJwtExp();
  if (detector) {
    try {
      const tokens = yield call(refreshTokens);
      yield put(Actions.loginWithJwt(tokens));
    } catch (err) {
      if (err.response && err.response.status === 400) {
        yield call(logout);
        yield put(Actions.logout());
        yield call([http, 'info'], 'You need to relogin!');
      }
    }
  }
}

export function* initUserSaga() {
  const user = yield call(getCurrentUser);
  yield put(Actions.checkExp(user));
  yield put(Actions.getUserFromLocalStorage(user));
}

export function* loginUserWithJwtSaga(action) {
  const { user } = yield action;
  yield call(loginWithJwt, user);
  yield put(Actions.initUserFromLocalStorage());
}

export function* initLoginSaga(action) {
  const { email, password, history } = yield action;
  try {
    const user = yield call(login, email, password);
    yield put(Actions.login(user));
    yield call([history, 'push'], '/');
  } catch (err) {
    yield call([http, 'error'], err);
  }
}
