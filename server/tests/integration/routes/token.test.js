const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../../models/user');

describe('/api/token', () => {
  let server;
  let refreshToken;
  let device;
  let response;

  const testUser = {
    name: 'Alex',
    email: '12345@gmail.com',
    password: '12345678Aa!'
  };

  beforeEach(async () => {
    server = require('../../../index');
    response = await request(server)
      .post('/api/users')
      .send(testUser);
  });

  afterEach(async () => {
    await server.close();
    await User.remove({});
  });

  const exec = () =>
    request(server)
      .get('/api/token')
      .set('x-refresh-token', refreshToken)
      .set('x-device-id', device)
      .send();

  it('should return 401 if no refresh token provided', async () => {
    refreshToken = '';
    device = response.header['x-device-id'];
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 401 if no device ID provided', async () => {
    refreshToken = response.header['x-refresh-token'];
    device = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 400 if invalid token provided', async () => {
    refreshToken = new User(testUser).generateRefreshToken();
    device = response.header['x-device-id'];
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if invalid device ID provided', async () => {
    refreshToken = response.header['x-refresh-token'];
    device = mongoose.Types.ObjectId().toHexString();
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if invalid user provided', async () => {
    refreshToken = new User({
      name: 'Alex2',
      email: '12345@gmail.coms',
      password: '12345678Aa!ad'
    }).generateRefreshToken();
    device = response.header['x-device-id'];
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if valid refresh token provided', async () => {
    refreshToken = response.header['x-refresh-token'];
    device = response.header['x-device-id'];
    const res = await exec();
    expect(res.status).toBe(200);
    expect(res.header).toHaveProperty('x-auth-token');
    expect(res.header).toHaveProperty('x-refresh-token');
  });
});
