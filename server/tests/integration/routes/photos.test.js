const request = require('supertest');
const mongoose = require('mongoose');
const { Photo } = require('../../../models/photo');
const { User } = require('../../../models/user');

describe('/api/photos', () => {
  let server;
  let token;
  beforeEach(() => {
    const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
    token = new User(user).generateAuthToken();
    server = require('../../../index');
  });

  afterEach(async () => {
    await server.close();
    await Photo.remove({});
  });

  const photo1 = {
    title: 'First photo',
    tags: ['nature', 'cat'],
    path: 'img/1.jpg',
  };
  const photo2 = {
    title: 'Second photo',
    tags: ['family', 'happiness'],
    path: 'img/2.jpg',
  };

  describe('GET /', () => {
    it('should return all photos', async () => {
      await Photo.insertMany([photo1, photo2]);

      const res = await request(server)
        .get('/api/photos')
        .send();

      expect(res.status).toBe(200);
      expect(res.body).not.toBeUndefined();
      expect(res.body.length).toBe(2);
      expect(res.body.some(title => title === 'First photo'));
      expect(res.body.some(title => title === 'Second photo'));
    });
  });

  describe('GET /:id', () => {
    it('should return 404 if photo with passed id is not found', async () => {
      const photo = await new Photo(photo1).save();
      photo._id = new mongoose.Types.ObjectId().toHexString();
      const res = await request(server)
        .get(`/api/photos/${photo._id}`)
        .send();
      expect(res.status).toBe(404);
    });

    it('should return photo with passed id', async () => {
      const photo = await new Photo(photo1).save();
      const res = await request(server)
        .get(`/api/photos/${photo._id}`)
        .send();
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('title', photo.title);
      expect(res.body).toHaveProperty('path', photo.path);
    });
  });

  describe('photo /', () => {
    let title;
    let path;
    let tags;

    beforeEach(() => {
      title = 'First photo';
      path = 'img/1.jpg';
      tags = ['nature', 'cat'];
    });

    const exec = () => request(server)
      .post('/api/photos')
      .set('x-auth-token', token)
      .send({
        title,
        path,
        tags,
      });

    it('should return 400 if invalid title is passed', async () => {
      title = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid path is passed', async () => {
      path = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid tags are passed', async () => {
      tags = [1, 2];
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if title is not passed', async () => {
      title = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if path is not passed', async () => {
      path = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save photo if photo is valid', async () => {
      const res = await exec();
      const photo = await Photo.findOne({ title, path });
      expect(res.status).toBe(200);
      expect(photo).toBeDefined();
      expect(photo).toHaveProperty('title', title);
      expect(photo).toHaveProperty('path', path);
      expect(photo).toHaveProperty('date');
      expect(photo).toHaveProperty('_id');
    });

    it('should return photo if photo is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', title);
      expect(res.body).toHaveProperty('path', path);
      expect(res.body).toHaveProperty('date');
      expect(res.body).toHaveProperty('_id');
    });
  });
  describe('PUT /:id', () => {
    let title;
    let path;
    let tags;
    let photo;

    beforeEach(async () => {
      title = 'Second photo';
      path = 'img/2.jpg';
      tags = ['family', 'happiness'];
      photo = await new Photo(photo1).save();
    });

    const exec = () => request(server)
      .put(`/api/photos/${photo._id}`)
      .set('x-auth-token', token)
      .send({
        title,
        path,
        tags,
      });

    it('should return 404 if photo with passed id is not found', async () => {
      photo._id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if invalid title is passed', async () => {
      title = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid path is passed', async () => {
      path = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid tags are passed', async () => {
      tags = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if title is not passed', async () => {
      title = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if path is not passed', async () => {
      path = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should change photo if passed photo is valid', async () => {
      const res = await exec();
      const changedPhoto = await Photo.findById(photo._id);
      expect(res.status).toBe(200);
      expect(changedPhoto).toBeDefined();
      expect(changedPhoto).toHaveProperty('title', title);
      expect(changedPhoto).toHaveProperty('path', path);
    });

    it('should return changed photo if passed photo is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('title', title);
      expect(res.body).toHaveProperty('path', path);
      expect(res.body).toHaveProperty('date');
      expect(res.body).toHaveProperty('_id');
    });
  });

  describe('DELETE /:id', () => {
    let photo;

    beforeEach(async () => {
      photo = await new Photo(photo1).save();
    });

    const exec = () => request(server)
      .delete(`/api/photos/${photo._id}`)
      .set('x-auth-token', token)
      .send();

    it('should return 404 if photo with passed id is not found', async () => {
      photo._id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should delete photo if passed photo is valid', async () => {
      const res = await exec();
      const deletedPhoto = await Photo.findById(photo._id);
      expect(res.status).toBe(200);
      expect(deletedPhoto).toBeNull();
    });

    it('should return deleted photo if passed photo is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('title', photo.title);
      expect(res.body).toHaveProperty('path', photo.path);
      expect(res.body).toHaveProperty('date');
      expect(res.body).toHaveProperty('_id');
    });
  });
});
