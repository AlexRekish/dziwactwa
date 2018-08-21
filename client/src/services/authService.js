import jwtDecode from 'jwt-decode';
import http from './httpService';

const usersEndpoint = `/auth`;
const tokenKey = 'token';

export const getJwt = () => localStorage.getItem(tokenKey);

http.setJwt(getJwt());

export const login = async (email, password) => {
  const res = await http.post(usersEndpoint, { email, password });
  localStorage.setItem(tokenKey, res.headers['x-auth-token']);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const loginWithJwt = token => {
  localStorage.setItem(tokenKey, token.headers['x-auth-token']);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
};
