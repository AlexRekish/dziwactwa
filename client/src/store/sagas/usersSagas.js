import { put, call } from 'redux-saga/effects';
import register from '../../services/usersService';
import { Actions } from '../actions/actions';
import http from '../../services/httpService';

export default function* registerSaga(action) {
  const { user, history } = yield action;
  try {
    const registeredUser = yield call(register, user);
    yield put(Actions.loginWithJwt(registeredUser));
    yield call([history, 'push'], '/');
  } catch (err) {
    yield call([http, 'error'], err);
  }
}
