import { put } from 'redux-saga/effects';
import { getCurrentUser } from '../../services/authService';
import { Actions } from '../actions/actions';

function* initUserSaga() {
  const user = yield getCurrentUser();
  yield put(Actions.getUserFromLocalStorage(user));
}

export default initUserSaga;
