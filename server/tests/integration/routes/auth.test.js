const request = require('supertest');
const { User } = require('../../../models/user');

describe('auth route', async () => {
  let server;
  let email;
  let password;
  const testUser = {
    name: 'Alex',
    email: '12345@gmail.com',
    password: '12345678Aa!',
  };

  beforeEach(async () => {
    email = '12345@gmail.com';
    password = '12345678Aa!';
    server = require('../../../index');
    await request(server).post('/api/users').send(testUser);
  });

  afterEach(async () => {
    await server.close();
    await User.remove({});
  });

  const exec = () => request(server)
    .post('/api/auth')
    .send({
      email,
      password,
    });

  it('should return 400 if invalid email is passed', async () => {
    email = '1';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if incorrect email is passed', async () => {
    email = '123789@mail.ru';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if invalid password is passed', async () => {
    password = '1';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if incorrect password is passed', async () => {
    password = '1234567aA!';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if user successfully logged in', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it('should return jwt if user successfully logged in', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
    expect(res.header).toHaveProperty('x-auth-token');
  });
});
