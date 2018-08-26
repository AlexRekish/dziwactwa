import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import randomBackground from './images';
import registerServiceWorker from './registerServiceWorker';
import 'react-toastify/dist/ReactToastify.css';
import authReducer from './store/reducers/auth';
import uploadImageReducer from './store/reducers/uploadImage';
import './index.sass';

randomBackground();

const rootReducer = combineReducers({
  auth: authReducer,
  uploadImage: uploadImageReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
