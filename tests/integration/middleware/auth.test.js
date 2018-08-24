const request = require('supertest');
const mongoose = require('mongoose');
const { BlogPost } = require('../../../models/blogpost');
const { User } = require('../../../models/user');

describe('auth middleware', () => {
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
    const blogpost = {
      title: 'First post',
      photo: 'img/1.jpg',
      text: 'Lorem ipsum 1'
    };

    beforeEach(() => {
      token = new User({
        _id: new mongoose.Types.ObjectId().toHexString(),
        isAdmin: true
      }).generateAuthToken();
    });

    describe('POST /', () => {
      const exec = () =>
        request(server)
          .post('/api/blog/posts')
          .set('x-auth-token', token)
          .send(blogpost);

      it('should return 401 if user is unauthorized', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it('should return 400 if invalid token is provided', async () => {
        token = '1';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return 200 if user is authorized', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });

    describe('PUT /', () => {
      const title = 'Title';
      const photo = 'Photo';
      const text = '1234567890';
      let putBlogPost;
      beforeEach(async () => {
        putBlogPost = await new BlogPost(blogpost).save();
      });

      const exec = () =>
        request(server)
          .put(`/api/blog/posts/${putBlogPost._id}`)
          .set('x-auth-token', token)
          .send({ title, photo, text });

      it('should return 401 if user is unauthorized', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it('should return 400 if invalid token is provided', async () => {
        token = '1';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return 200 if user is authorized', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });
    describe('DELETE /', () => {
      let deleteBlogPost;
      beforeEach(async () => {
        deleteBlogPost = await new BlogPost(blogpost).save();
      });

      const exec = () =>
        request(server)
          .delete(`/api/blog/posts/${deleteBlogPost._id}`)
          .set('x-auth-token', token)
          .send();

      it('should return 401 if user is unauthorized', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it('should return 400 if invalid token is provided', async () => {
        token = '1';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return 200 if user is authorized', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });
  });
});
