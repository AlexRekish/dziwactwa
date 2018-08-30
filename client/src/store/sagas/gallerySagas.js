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
  const { id } = yield action;
  try {
    yield call(deletePhoto, id);
    yield put(Actions.deleteImageSucceed(id));
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
  const { image, history } = yield action;
  try {
    yield call(addNewPhoto, image);
    yield call([http, 'success'], 'Photo added!');
    yield call([history, 'push'], '/gallery');
  } catch (err) {
    yield call([http, 'error'], err);
  }
}
