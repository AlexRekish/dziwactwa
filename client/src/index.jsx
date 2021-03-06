import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import randomBackground from './images';
import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth';
import uploadImageReducer from './store/reducers/uploadImage';
import dataLoadReducer from './store/reducers/dataLoad';
import blogReducer from './store/reducers/blog';
import galleryReducer from './store/reducers/gallery';

import { watchAuth, watchUploadImage, watchBlog, watchRegister, watchGallery } from './store/sagas';

import 'react-toastify/dist/ReactToastify.css';
import './index.sass';

randomBackground();

const rootReducer = combineReducers({
  auth: authReducer,
  uploadImage: uploadImageReducer,
  load: dataLoadReducer,
  blog: blogReducer,
  gallery: galleryReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchUploadImage);
sagaMiddleware.run(watchBlog);
sagaMiddleware.run(watchRegister);
sagaMiddleware.run(watchGallery);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
