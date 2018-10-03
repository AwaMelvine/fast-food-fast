import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import {
  firstCategory,
  secondCategory,
  modifiedSecondCategory,
  firstCategoryId,
  secondCategoryId,
} from '../data/categories';
import { initCategories } from '../../api/v1/db/seed.test';
import { adminToken } from '../data/users';

chai.use(chaiHttp);

before(async () => {
  await initCategories();
});

after((done) => {
  done();
});

describe('Food Categories', () => {
  describe('GET /categories - Get all food item categories', () => {
    it('should return a json object', (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body[0].name).to.be.equal(firstCategory.name);
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should return all available Categories', (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(1);
          done();
        });
    });
  });

  describe('GET /:categoryId - Get category by ID', () => {
    it('should return a json Object', (done) => {
      chai.request(app)
        .get(`/api/v1/categories/${firstCategoryId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.id).to.be.equal(1);
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('POST /categories - Create a Category', () => {
    it('should create a new category', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('authorization', `token ${adminToken}`)
        .send(secondCategory)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.data.name).equal(secondCategory.name);
          done();
        });
    });

    it('should return an error if category already exists', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('authorization', `token ${adminToken}`)
        .send(secondCategory)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body.errors.name).to.be.equal('A category with that name already exists');
          done();
        });
    });

    it('should not create category with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('authorization', `token ${adminToken}`)
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('PUT /:categoryId - Update Food Item category', () => {
    it('should update a category', (done) => {
      chai.request(app)
        .put(`/api/v1/categories/${secondCategoryId}`)
        .set('authorization', `token ${adminToken}`)
        .send(modifiedSecondCategory)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.data.name).equal(modifiedSecondCategory.name);
          done();
        });
    });
    it('should return an error if category is invalid', (done) => {
      chai.request(app)
        .put(`/api/v1/categories/${secondCategoryId}`)
        .set('authorization', `token ${adminToken}`)
        .send({ a: 'test' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('DELETE /:categoryId - Delete food category', () => {
    it('should delete a category given the category id', (done) => {
      chai.request(app)
        .delete(`/api/v1/categories/${secondCategoryId}`)
        .set('authorization', `token ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          expect(res.body).to.eql({});
          done();
        });
    });
  });
});
