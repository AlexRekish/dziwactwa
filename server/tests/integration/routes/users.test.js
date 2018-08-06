const request = require('supertest');
const { User } = require('../../../models/user');

describe('/api/users/me', () => {
  let server;
  describe('GET /', () => {

  });

  describe('POST /', () => {
    let email;
    let password;
    let name;

    beforeEach(() => {
      email = '12345@gmail.com';
      password = '1234567Aa!';
      name = 'Alex';
      server = require('../../../index');
    });

    afterEach(async () => {
      await server.close();
      await User.remove({});
    });

    const exec = () => request(server).post('/api/users').send({ name, email, password });

    it('should return 400 if email is not passed', async () => {
      email = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password is not passed', async () => {
      password = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if name is not passed', async () => {
      name = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if email is invalid', async () => {
      email = '12345';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if name is invalid', async () => {
      email = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password is invalid', async () => {
      password = '12345';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password is too weak', async () => {
      password = '1234567890';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if user with current email already exist', async () => {
      const user = new User({ name, email, password });
      await user.save();
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 200 if name, email and password are valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should save new user in DB', async () => {
      const res = await exec();
      const user = await User.findOne({ email });
      expect(res.status).toBe(200);
      expect(user).toHaveProperty('name', name);
      expect(user).toHaveProperty('email', email);
    });

    it('should return jwt if user is successfully registered', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty('x-auth-token');
    });

    it('should return user _id if user is successfully registered', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
    });
  });
});
