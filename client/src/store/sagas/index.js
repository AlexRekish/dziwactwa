import { takeEvery, all } from 'redux-saga/effects';
import { checkExpSaga, initUserSaga, initLoginSaga, loginUserWithJwtSaga } from './authSagas';
import initUploadImageSaga from './uploadImageSagas';
import ActionType from '../actions/actions';
import {
  startLoadPostsSaga,
  startLoadPostSaga,
  startDeletePostSaga,
  startAddPostSaga,
  editPostSaga
} from './blogSagas';
import { startLoadImagesSaga, startAddImageSaga, startDeleteImageSaga } from './gallerySagas';
import registerSaga from './usersSagas';

export function* watchAuth() {
  yield all([
    takeEvery(ActionType.CHECK_EXP, checkExpSaga),
    takeEvery(ActionType.INIT_USER_FROM_LSTORAGE, initUserSaga),
    takeEvery(ActionType.INIT_LOGIN, initLoginSaga),
    takeEvery(ActionType.LOGIN_WITH_JWT, loginUserWithJwtSaga)
  ]);
}

export function* watchUploadImage() {
  yield all([takeEvery(ActionType.INIT_UPLOAD_IMAGE, initUploadImageSaga)]);
}

export function* watchBlog() {
  yield all([
    takeEvery(ActionType.START_LOAD_POSTS, startLoadPostsSaga),
    takeEvery(ActionType.START_LOAD_POST, startLoadPostSaga),
    takeEvery(ActionType.START_DELETE_POST, startDeletePostSaga),
    takeEvery(ActionType.START_ADD_POST, startAddPostSaga),
    takeEvery(ActionType.EDIT_POST, editPostSaga)
  ]);
}

export function* watchRegister() {
  yield all([takeEvery(ActionType.REGISTER, registerSaga)]);
}

export function* watchGallery() {
  yield all([
    takeEvery(ActionType.START_LOAD_IMAGES, startLoadImagesSaga),
    takeEvery(ActionType.START_DELETE_IMAGE, startDeleteImageSaga),
    takeEvery(ActionType.START_ADD_IMAGE, startAddImageSaga)
  ]);
}
