import { put } from 'redux-saga/effects';
import { Actions } from '../actions/actions';
import http from '../../services/httpService';
import uploadImage from '../../services/uploadImageService';

export default function* initUploadImageSaga(action) {
  const { selectedImage } = yield action;
  try {
    const { data: link } = yield uploadImage(selectedImage);
    yield put(Actions.uploadImage(link));
  } catch (err) {
    yield http.error(err);
  }
}
