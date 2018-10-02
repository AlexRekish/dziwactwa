import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://dziwactwa.herokuapp.com/api';

axios.interceptors.response.use(null, err => {
  const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    toast.error(err.response.data);
  }
  return Promise.reject(err);
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt || '';
}

function error(err, message) {
  if (!err) return toast.error(message);
  return toast.error(`${err.response.status} ${err.response.data}`);
}

function success(message) {
  return toast.success(message);
}

function info(message) {
  return toast.info(message);
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  error,
  success,
  info,
  setJwt
};
