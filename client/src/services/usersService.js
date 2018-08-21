import http from './httpService';

const usersEndpoint = '/users';

const register = user =>
  http.post(usersEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name
  });

export default register;
