import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { initFoodItems, initUsers } from '../../api/v1/db/seed.test';
import {
  firstItem,
  firstItemId,
  secondItem,
  secondItemId,
  modifiedSecondItem,
} from '../data/foodItems';

chai.use(chaiHttp);

// Initialize test database for test
before(async () => {
  await initFoodItems();
});

after(async () => {

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
          expect(res.body.data.length).to.be.equal(1);
          expect(res.body.data[0].name).to.be.equal(firstItem.name);
          done();
        });
    });
  });

  describe('GET /:foodItemId - Get foodItem by ID', () => {
    it('should return food item as a json object', (done) => {
      chai.request(app)
        .get(`/api/v1/foodItems/${firstItemId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          expect(res.body.data.name).to.be.equal(firstItem.name);
          done();
        });
    });
  });

  describe('POST /foodItems - Create food item', () => {
    it('should create a new food item', (done) => {
      chai.request(app)
        .post('/api/v1/foodItems')
        .send(secondItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.data.name).equal(secondItem.name);
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
        .put(`/api/v1/foodItems/${secondItemId}`)
        .send(modifiedSecondItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.data.name).equal(modifiedSecondItem.name);
          done();
        });
    });
  });

  describe('DELETE /:foodItemId - Delete food item', () => {
    it('should delete a food item given the item id', (done) => {
      chai.request(app)
        .delete(`/api/v1/foodItems/${secondItemId}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });
});
