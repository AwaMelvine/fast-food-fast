import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import {
  allFoodItems,
  initialFoodItem,
  foodItem2,
  modifiedFoodItem2,
  foodItemId,
  created_at,
} from '../data/foodItems';

chai.use(chaiHttp);


// Initialize test database for test
before((done) => {
  chai.request(app)
    .post('/api/v1/foodItems')
    .send(initialFoodItem)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

after((done) => {
  allFoodItems.length = 0;
  done();
});

describe('Food Items', () => {
  describe('GET /foodItems - Get all food items', () => {
    it('should return a json object', (done) => {
      chai.request(app)
        .get('/api/v1/foodItems')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should have all available food items', (done) => {
      chai.request(app)
        .get('/api/v1/foodItems')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(2);
          expect(res.body[1].id).to.be.equal(2);
          done();
        });
    });
  });

  describe('GET /:foodItemId - Get foodItem by ID', () => {
    it('should return a json Object', (done) => {
      chai.request(app)
        .get(`/api/v1/foodItems/${foodItemId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.be.equal('Vegetable');
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('POST /foodItems - Create food item', () => {
    it('should create a new food item', (done) => {
      chai.request(app)
        .post('/api/v1/foodItems')
        .send(foodItem2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.name).equal('Rice');
          done();
        });
    });

    it('should not create food item with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/foodItems')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('PUT /:foodItemId - Update Food Item', () => {
    it('should update a food item', (done) => {
      chai.request(app)
        .put(`/api/v1/foodItems/${foodItemId}`)
        .send(modifiedFoodItem2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(modifiedFoodItem2.name).equal(res.body.name);
          done();
        });
    });
  });

  describe('DELETE /:foodItemId - Delete food item', () => {
    it('should delete a food item given the item id', (done) => {
      chai.request(app)
        .delete(`/api/v1/foodItems/${foodItemId}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });
});
