import { put, call } from 'redux-saga/effects';
import { Actions } from '../actions/actions';
import http from '../../services/httpService';
import uploadImage from '../../services/uploadImageService';

export default function* initUploadImageSaga(action) {
  const { selectedImage } = yield action;
  try {
    const { data: link } = yield call(uploadImage, selectedImage);
    yield put(Actions.uploadImage(link));
  } catch (err) {
    yield call([http, 'error'], err);
  }
}
