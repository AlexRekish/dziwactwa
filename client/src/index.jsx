import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import randomBackground from './images';
import registerServiceWorker from './registerServiceWorker';
import 'react-toastify/dist/ReactToastify.css';
import './index.sass';

randomBackground();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
