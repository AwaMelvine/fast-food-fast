import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { initFoodItems, initUsers } from '../../api/v1/db/seed.test';
import {
  invalidFoodItemId,
  notFoundItemId,
  firstItem,
  firstItemId,
  secondItem,
  secondItemId,
  modifiedSecondItem,
} from '../data/foodItems';
import { userToken, adminToken, inValidToken } from '../data/users';

chai.use(chaiHttp);

// Initialize test database for test
before(async () => {
  await initFoodItems();
});

after(async () => {

});

describe('Food Items', () => {
  describe('GET /menu - Get all food items', () => {
    it('should return a json object', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should have all available food items', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
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
        .get(`/api/v1/menu/${firstItemId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          expect(res.body.data.name).to.be.equal(firstItem.name);
          done();
        });
    });
  });

  describe('POST /menu - Create food item', () => {
    it('should return error an error if no token provided', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send(secondItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(403);
          expect(res.body.error).equal('No token provided');
          done();
        });
    });
    it('should return error an error if token is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('authorization', `token ${inValidToken}`)
        .send(secondItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(401);
          expect(res.body.error).equal('Failed to authenticate');
          done();
        });
    });
    it('should return error an error if user is not admin', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('authorization', `token ${userToken}`)
        .send(secondItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(401);
          expect(res.body.error).equal('Unauthorized');
          done();
        });
    });
    it('should create a new food item', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('authorization', `token ${adminToken}`)
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
        .post('/api/v1/menu')
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
        .put(`/api/v1/menu/${secondItemId}`)
        .set('authorization', `token ${adminToken}`)
        .send(modifiedSecondItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.data.name).equal(modifiedSecondItem.name);
          done();
        });
    });
    it('should return an error if item id is invalid', (done) => {
      chai.request(app)
        .put(`/api/v1/menu/${invalidFoodItemId}`)
        .send(modifiedSecondItem)
        .set('authorization', `token ${adminToken}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body.errors.food_item_id).equal('A valid food Item Id is required');
          done();
        });
    });
    it('should inform user if item does not exist', (done) => {
      chai.request(app)
        .put(`/api/v1/menu/${notFoundItemId}`)
        .set('authorization', `token ${adminToken}`)
        .send(modifiedSecondItem)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.errors.global).equal('Food item not found');
          done();
        });
    });
  });

  describe('DELETE /:foodItemId - Delete food item', () => {
    it('should delete a food item given the item id', (done) => {
      chai.request(app)
        .delete(`/api/v1/menu/${secondItemId}`)
        .set('authorization', `token ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });
});
