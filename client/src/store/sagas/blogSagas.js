import { put, call } from 'redux-saga/effects';
import { Actions } from '../actions/actions';
import { getPosts, getPost, deletePost, addNewPost, editPost } from '../../services/blogService';
import http from '../../services/httpService';

export function* startLoadPostsSaga() {
  yield put(Actions.startLoad());
  try {
    const { data: posts } = yield getPosts();
    yield put(Actions.loadPostsSucceed(posts));
  } catch (err) {
    yield put(Actions.loadPostsFailed());
    return call([http, 'error'], err);
  } finally {
    yield put(Actions.endLoad());
  }
}

export function* startLoadPostSaga(action) {
  const { id, history } = yield action;
  yield put(Actions.startLoad());
  try {
    const { data: post } = yield call(getPost, id);
    yield put(Actions.loadPostSucceed(post));
  } catch (err) {
    yield put(Actions.loadPostFailed());
    if (err.response && err.response.status === 404) {
      yield call([http, 'error'], err);
      return history.replace('/blog');
    }
    return call([http, 'error'], err);
  } finally {
    yield put(Actions.endLoad());
  }
}

export function* startDeletePostSaga(action) {
  const { id, history } = yield action;
  try {
    yield call(deletePost, id);
    yield put(Actions.deletePostSucceed());
    yield call([http, 'success'], 'Successful deleted');
    yield history.replace('/blog');
  } catch (err) {
    yield put(Actions.deletePostFailed(err));
    if (err.response) {
      if (err.response.status === 404) {
        yield call([http, 'error'], err);
        return history.replace('/blog');
      }
      return call([http, 'error'], err);
    }
  }
}

export function* startAddPostSaga(action) {
  const { post, history } = yield action;
  try {
    yield call(addNewPost, post);
    yield call([http, 'success'], 'Post added!');
    yield call([history, 'push'], '/blog');
    yield put(Actions.clearImage());
  } catch (err) {
    yield call([http, 'error'], err);
  }
}

export function* editPostSaga(action) {
  const { id, post, history } = action;
  try {
    yield call(editPost, id, post);
    yield call([http, 'success'], 'Post successfully changed!');
    yield call([history, 'push'], '/blog');
    yield put(Actions.endEditPost());
  } catch (err) {
    if (err.response && err.response.status === 404) {
      yield call([http, 'error'], err);
      return history.replace('/blog');
    }
    yield call([http, 'error'], err);
  }
}
