const request = require('supertest');
const mongoose = require('mongoose');
const { BlogPost } = require('../../../models/blogpost');
const { User } = require('../../../models/user');

describe('/api/blog/posts', () => {
  let server;
  let token;
  beforeEach(() => {
    const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
    token = new User(user).generateAuthToken();
    server = require('../../../index');
  });

  afterEach(async () => {
    await server.close();
    await BlogPost.remove({});
  });

  const blogpost1 = {
    title: 'First post',
    photo: 'img/1.jpg',
    text: 'Lorem ipsum 1',
  };
  const blogpost2 = {
    title: 'Second post',
    photo: 'img/2.jpg',
    text: 'Lorem ipsum 2',
  };

  describe('GET /', () => {
    it('should return all blog posts', async () => {
      await BlogPost.insertMany([blogpost1, blogpost2]);

      const res = await request(server)
        .get('/api/blog/posts')
        .send();

      expect(res.status).toBe(200);
      expect(res.body).not.toBeUndefined();
      expect(res.body.length).toBe(2);
      expect(res.body.some(title => title === 'First post'));
      expect(res.body.some(title => title === 'Second post'));
    });
  });

  describe('GET /:id', () => {
    it('should return 404 if blogpost with passed id is not found', async () => {
      const blogpost = await new BlogPost(blogpost1).save();
      blogpost._id = new mongoose.Types.ObjectId().toHexString();
      const res = await request(server)
        .get(`/api/blog/posts/${blogpost._id}`)
        .send();
      expect(res.status).toBe(404);
    });

    it('should return blogpost with passed id', async () => {
      const blogpost = await new BlogPost(blogpost1).save();
      const res = await request(server)
        .get(`/api/blog/posts/${blogpost._id}`)
        .send();
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('title', blogpost.title);
      expect(res.body).toHaveProperty('photo', blogpost.photo);
      expect(res.body).toHaveProperty('text', blogpost.text);
    });
  });

  describe('POST /', () => {
    let title;
    let photo;
    let text;

    beforeEach(() => {
      title = 'First post';
      photo = 'img/1.jpg';
      text = 'Lorem ipsum';
    });

    const exec = () => request(server)
      .post('/api/blog/posts')
      .set('x-auth-token', token)
      .send({
        title,
        photo,
        text,
      });

    it('should return 400 if invalid title is passed', async () => {
      title = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid photo is passed', async () => {
      photo = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid text is passed', async () => {
      text = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if title is not passed', async () => {
      title = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if photo is not passed', async () => {
      photo = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if text is not passed', async () => {
      text = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save blog post if blog post is valid', async () => {
      const res = await exec();
      const blogpost = await BlogPost.findOne({ title, photo, text });
      expect(res.status).toBe(200);
      expect(blogpost).toBeDefined();
      expect(blogpost).toHaveProperty('title', title);
      expect(blogpost).toHaveProperty('photo', photo);
      expect(blogpost).toHaveProperty('text', text);
      expect(blogpost).toHaveProperty('date');
      expect(blogpost).toHaveProperty('_id');
    });

    it('should return blog post if blog post is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', title);
      expect(res.body).toHaveProperty('photo', photo);
      expect(res.body).toHaveProperty('text', text);
      expect(res.body).toHaveProperty('date');
      expect(res.body).toHaveProperty('_id');
    });
  });
  describe('PUT /:id', () => {
    let title;
    let photo;
    let text;
    let blogpost;

    beforeEach(async () => {
      title = 'Second post';
      photo = 'img/2.jpg';
      text = 'Lorem ipsum 2';
      blogpost = await new BlogPost(blogpost1).save();
    });

    const exec = () => request(server)
      .put(`/api/blog/posts/${blogpost._id}`)
      .set('x-auth-token', token)
      .send({
        title,
        photo,
        text,
      });

    it('should return 404 if blog post with passed id is not found', async () => {
      blogpost._id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if invalid title is passed', async () => {
      title = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid photo is passed', async () => {
      photo = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid text is passed', async () => {
      text = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if title is not passed', async () => {
      title = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if photo is not passed', async () => {
      photo = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if text is not passed', async () => {
      text = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should change blog post if passed blog post is valid', async () => {
      const res = await exec();
      const changedBlogpost = await BlogPost.findById(blogpost._id);
      expect(res.status).toBe(200);
      expect(changedBlogpost).toBeDefined();
      expect(changedBlogpost).toHaveProperty('title', title);
      expect(changedBlogpost).toHaveProperty('photo', photo);
      expect(changedBlogpost).toHaveProperty('text', text);
    });

    it('should return changed blog post if passed blog post is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('title', title);
      expect(res.body).toHaveProperty('photo', photo);
      expect(res.body).toHaveProperty('text', text);
      expect(res.body).toHaveProperty('date');
      expect(res.body).toHaveProperty('_id');
    });
  });

  describe('DELETE /:id', () => {
    let blogpost;

    beforeEach(async () => {
      blogpost = await new BlogPost(blogpost1).save();
    });

    const exec = () => request(server)
      .delete(`/api/blog/posts/${blogpost._id}`)
      .set('x-auth-token', token)
      .send();

    it('should return 404 if blog post with passed id is not found', async () => {
      blogpost._id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should delete blog post if passed blog post is valid', async () => {
      const res = await exec();
      const deletedBlogpost = await BlogPost.findById(blogpost._id);
      expect(res.status).toBe(200);
      expect(deletedBlogpost).toBeNull();
    });

    it('should return deleted blog post if passed blog post is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('title', blogpost.title);
      expect(res.body).toHaveProperty('photo', blogpost.photo);
      expect(res.body).toHaveProperty('text', blogpost.text);
      expect(res.body).toHaveProperty('date');
      expect(res.body).toHaveProperty('_id');
    });
  });
});
