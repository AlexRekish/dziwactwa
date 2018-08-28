import { takeEvery, all } from 'redux-saga/effects';
import initUserSaga from './authSagas';
import initUploadImageSaga from './uploadImageSagas';
import ActionType from '../actions/actions';
import {
  startLoadPostsSaga,
  startLoadPostSaga,
  startDeletePostSaga,
  startAddPostSaga
} from './blogSagas';

export function* watchAuth() {
  yield all([takeEvery(ActionType.INIT_USER_FROM_LSTORAGE, initUserSaga)]);
}

export function* watchUploadImage() {
  yield all([takeEvery(ActionType.INIT_UPLOAD_IMAGE, initUploadImageSaga)]);
}

export function* watchBlog() {
  yield all([
    takeEvery(ActionType.START_LOAD_POSTS, startLoadPostsSaga),
    takeEvery(ActionType.START_LOAD_POST, startLoadPostSaga),
    takeEvery(ActionType.START_DELETE_POST, startDeletePostSaga),
    takeEvery(ActionType.START_ADD_POST, startAddPostSaga)
  ]);
}
