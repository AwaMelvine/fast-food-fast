import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import db from '../../api/v1/db';
import {
  allCategories, initialCategory, category2, modifiedCategory2,
} from '../data/categories';

chai.use(chaiHttp);

// Initialize test database for test
before((done) => {
  chai.request(app)
    .post('/api/v1/categories')
    .send(initialCategory)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

after((done) => {
  // clear database
  // clear_categories();
  allCategories.length = 0;
  done();
});

describe('Food Categories', () => {
  describe('GET /categories - Get all food item categories', () => {
    it('should return a json object', (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body[0].name).to.be.equal('Salads');
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
      const categoryId = 1;
      chai.request(app)
        .get(`/api/v1/categories/${categoryId}`)
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
        .send(category2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.name).equal('Grains');
          done();
        });
    });

    it('should not create category with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
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
      const categoryId = 1;
      chai.request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .send(modifiedCategory2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);

          expect(res.body.name).equal('African');
          done();
        });
    });
  });

  describe('DELETE /:categoryId - Delete food category', () => {
    it('should delete a category given the category id', (done) => {
      const categoryId = 1;
      chai.request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          expect(res.body).to.eql({});
          done();
        });
    });
  });
});
