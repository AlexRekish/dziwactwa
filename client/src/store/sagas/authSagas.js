import { put, call } from 'redux-saga/effects';
import { getCurrentUser, login, loginWithJwt } from '../../services/authService';
import { Actions } from '../actions/actions';
import http from '../../services/httpService';

export function* initUserSaga() {
  const user = yield call(getCurrentUser);
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
