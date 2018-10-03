import { put, call } from 'redux-saga/effects';
import { Actions } from '../actions/actions';
import { getPhotos, deletePhoto, addNewPhoto } from '../../services/galleryService';
import http from '../../services/httpService';

export function* startLoadImagesSaga() {
  yield put(Actions.startLoad());
  try {
    const { data: photos } = yield getPhotos();
    yield put(Actions.loadImagesSucceed(photos));
  } catch (err) {
    yield put(Actions.loadImagesFailed());
    return call([http, 'error'], err);
  } finally {
    yield put(Actions.endLoad());
  }
}

export function* startDeleteImageSaga(action) {
  const { id, index, user } = yield action;
  yield put(Actions.checkExp(user));
  try {
    yield call(deletePhoto, id);
    yield put(Actions.deleteImageSucceed(id));
    yield put(Actions.openLightBox(index));
    yield call([http, 'success'], 'Successful deleted');
  } catch (err) {
    yield put(Actions.deleteImageFailed(err));
    if (err.response) {
      if (err.response.status === 404) {
        return call([http, 'error'], err);
      }
      return call([http, 'error'], err);
    }
  }
}

export function* startAddImageSaga(action) {
  const { image, history, user } = yield action;
  yield put(Actions.checkExp(user));
  try {
    yield call(addNewPhoto, image);
    yield call([http, 'success'], 'Photo added!');
    yield call([history, 'push'], '/gallery');
    yield put(Actions.clearImage());
  } catch (err) {
    yield call([http, 'error'], err);
  }
}
