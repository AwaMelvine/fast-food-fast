import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';
import { Category, allCategories } from '../api/v1/models/Category';

chai.use(chaiHttp);

const initialCategory = new Category({
  id: 1,
  name: 'Salads',
  description: 'Healthy!!!',
  updatedAt: '03-09-2018',
  createdAt: '03-09-2018',
});

// Initialize test database for test
beforeEach((done) => {
  chai.request(app)
    .post('/api/v1/categories')
    .send(initialCategory)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

afterEach((done) => {
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
    it('should have all available Categories', (done) => {
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
    it('should return an error if categoryId is invalid', (done) => {
      const categoryId = null;
      chai.request(app)
        .get(`/api/v1/categories/${categoryId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('POST /categories - Create a Category', () => {
    const category2 = {
      id: 2,
      name: 'Grains',
      description: 'Very delicious',
      updatedAt: '04-09-2018',
      createdAt: '04-09-2018',
    };

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
    const modifiedCategory = {
      id: 2,
      name: 'African cuisine',
      description: 'Only in Africa',
      updatedAt: '04-09-2018',
      createdAt: '04-09-2018',
    };
    it('should update a category', (done) => {
      const categoryId = 1;
      chai.request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .send(modifiedCategory)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);

          expect(JSON.stringify(modifiedCategory)).equal(JSON.stringify(res.body));
          done();
        });
    });
    it('should return an error if value of categoryId is invalid', (done) => {
      const categoryId = null;
      chai.request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .send(modifiedCategory)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
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
  describe('Category model', () => {
    it('should instantiate a new Category object', () => {
      const createdAt = '03-09-2018';
      const tempCategory = new Category({ createdAt });
      expect(tempCategory.createdAt).equal(createdAt);
      expect(tempCategory).to.be.an.instanceOf(Category);
    });
  });
});
