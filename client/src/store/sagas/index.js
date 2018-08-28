import { takeEvery, all } from 'redux-saga/effects';
import initUserSaga from './authSagas';
import initUploadImageSaga from './uploadImageSagas';
import ActionType from '../actions/actions';

export function* watchAuth() {
  yield all([takeEvery(ActionType.INIT_USER_FROM_LSTORAGE, initUserSaga)]);
}

export function* watchUploadImage() {
  yield all([takeEvery(ActionType.INIT_UPLOAD_IMAGE, initUploadImageSaga)]);
}
