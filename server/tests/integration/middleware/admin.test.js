const request = require('supertest');
const mongoose = require('mongoose');
const { BlogPost } = require('../../../models/blogpost');
const { User } = require('../../../models/user');

describe('admin middleware', () => {
  let server;
  beforeEach(() => {
    server = require('../../../index');
  });

  afterEach(async () => {
    await server.close();
    await BlogPost.remove({});
  });
  describe('api/blog/posts', () => {
    let token;
    let blogpost;
    beforeEach(async () => {
      const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: false };
      token = new User(user).generateAuthToken();
    });
    describe('POST /', () => {
      const exec = () => request(server)
        .post('/api/blog/posts/')
        .set('x-auth-token', token)
        .send({ title: 'Second post', photo: 'photo2', text: 'Lorem ipsum 1234' });

      it('should return 403 if user is authorized, but token is invalid', async () => {
        const res = await exec();
        expect(res.status).toBe(403);
      });

      it('should return 200 if user is authorized and token is valid', async () => {
        const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        token = new User(user).generateAuthToken();
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });
    describe('PUT /', () => {
      beforeEach(async () => {
        blogpost = new BlogPost({
          title: 'First post',
          photo: 'photo1',
          text: 'Lorem ipsum 1234',
        });
        await blogpost.save();
      });
      const exec = () => request(server)
        .put(`/api/blog/posts/${blogpost._id}`)
        .set('x-auth-token', token)
        .send({ title: 'Second post', photo: 'photo2', text: 'Lorem ipsum 1234' });

      it('should return 403 if user is authorized, but token is invalid', async () => {
        const res = await exec();
        expect(res.status).toBe(403);
      });

      it('should return 200 if user is authorized and token is valid', async () => {
        const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        token = new User(user).generateAuthToken();
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });
    describe('DELETE /', () => {
      beforeEach(async () => {
        blogpost = new BlogPost({
          title: 'First post',
          photo: 'photo1',
          text: 'Lorem ipsum 1234',
        });
        await blogpost.save();
      });
      const exec = () => request(server)
        .delete(`/api/blog/posts/${blogpost._id}`)
        .set('x-auth-token', token)
        .send();

      it('should return 403 if user is authorized, but token is invalid', async () => {
        const res = await exec();
        expect(res.status).toBe(403);
      });

      it('should return 200 if user is authorized and token is valid', async () => {
        const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        token = new User(user).generateAuthToken();
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });
  });
});
