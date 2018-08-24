const request = require('supertest');
const mongoose = require('mongoose');
const { BlogPost } = require('../../../models/blogpost');
const { User } = require('../../../models/user');

describe('validateObjectId middleware', () => {
  let server;
  let token;
  const blogpost1 = {
    title: 'First post',
    photo: 'img/1.jpg',
    text: 'Lorem ipsum 1'
  };
  beforeEach(() => {
    const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
    token = new User(user).generateAuthToken();
    server = require('../../../index');
  });

  afterEach(async () => {
    await server.close();
    await BlogPost.remove({});
  });
  describe('GET /:id', () => {
    it('should return 404 if invalid ID is provided', async () => {
      await new BlogPost(blogpost1).save();
      const res = await request(server)
        .get('/api/blog/posts/1')
        .send();
      expect(res.status).toBe(404);
    });

    it('should return 200 if valid ID is provided', async () => {
      const blogpost = await new BlogPost(blogpost1).save();
      const res = await request(server)
        .get(`/api/blog/posts/${blogpost._id}`)
        .send();
      expect(res.status).toBe(200);
    });
  });
  describe('PUT /:id', () => {
    const title = 'Second post';
    const photo = 'img/2.jpg';
    const text = 'Lorem ipsum2';
    it('should return 404 if invalid ID is provided', async () => {
      await new BlogPost(blogpost1).save();
      const res = await request(server)
        .put('/api/blog/posts/1')
        .set('x-auth-token', token)
        .send({ title, photo, text });
      expect(res.status).toBe(404);
    });

    it('should return 200 if valid ID is provided', async () => {
      const blogpost = await new BlogPost(blogpost1).save();
      const res = await request(server)
        .put(`/api/blog/posts/${blogpost._id}`)
        .set('x-auth-token', token)
        .send({ title, photo, text });
      expect(res.status).toBe(200);
    });
  });
  describe('DELETE /:id', () => {
    it('should return 404 if invalid ID is provided', async () => {
      await new BlogPost(blogpost1).save();
      const res = await request(server)
        .delete('/api/blog/posts/1')
        .set('x-auth-token', token)
        .send();
      expect(res.status).toBe(404);
    });

    it('should return 200 if valid ID is provided', async () => {
      const blogpost = await new BlogPost(blogpost1).save();
      const res = await request(server)
        .delete(`/api/blog/posts/${blogpost._id}`)
        .set('x-auth-token', token)
        .send();
      expect(res.status).toBe(200);
    });
  });
});
