import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { allFoodItems } from '../../api/v1/models/FoodItem';
import {
  initialFoodItem, foodItem2, modifiedFoodItem, invalidFoodItemId, foodItemId, createdAt,
} from '../data/foodItems';

chai.use(chaiHttp);


// Initialize test database for test
beforeEach((done) => {
  chai.request(app)
    .post('/api/v1/foodItems')
    .send(initialFoodItem)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

afterEach((done) => {
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
          expect(res.body.length).to.be.equal(1);
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
          expect(res.body.name).to.be.equal('Vegetable Salad');
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should return an error if value of foodItemId is invalid', (done) => {
      chai.request(app)
        .get(`/api/v1/foodItems/${invalidFoodItemId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.foodItemId).to.equal('A valid food Item Id is required');
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
          expect(res.body.name).equal('Hamburger');
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
        .send(modifiedFoodItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);

          expect(JSON.stringify(modifiedFoodItem)).equal(JSON.stringify(res.body));
          done();
        });
    });
    it('should return an error if value of foodItemId is invalid', (done) => {
      const foodItemId = null;
      chai.request(app)
        .put(`/api/v1/foodItems/${foodItemId}`)
        .send(modifiedFoodItem)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.foodItemId).to.equal('A valid food Item Id is required');
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
