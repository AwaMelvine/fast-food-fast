import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';
import { Order, allOrders } from '../api/v1/models/Order';
import { initialOrder, order2, orderDate } from './data/orders';

const should = chai.should();
chai.use(chaiHttp);


// Initialize test database for test
beforeEach((done) => {
  chai.request(app)
    .post('/api/v1/orders')
    .send(initialOrder)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

afterEach((done) => {
  allOrders.length = 0;
  done();
});

describe('Orders', () => {
  describe('GET /orders - Get all orders', () => {
    it('should return a json object', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should all available orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.length).to.be.equal(1);
          done();
        });
    });
  });

  describe('GET /:orderId - Get order by ID', () => {
    it('should return a json Object', (done) => {
      const orderId = 1;
      chai.request(app)
        .get(`/api/v1/orders/${orderId}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });
    it('should return an error if value of orderId is invalid', (done) => {
      const orderId = null;
      chai.request(app)
        .get(`/api/v1/orders/${orderId}`)
        .end((err, res) => {
          res.should.have.status(422);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('POST /orders - Place order', () => {
    it('should place a new order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(order2)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          expect(res.body.length).equal(2);
          done();
        });
    });

    it('should not place an order with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('PUT /:orderId - Update Order Status', () => {
    const orderId = 1;
    const status = 'DECLINED';
    it('should update an order status', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send({ status })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(201);

          expect(res.body.orderStatus).equal('DECLINED');
          done();
        });
    });
    it('should return an error if orderId is invalid', (done) => {
      const orderId = 0;
      const status = 'CANCELLED';
      chai.request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send({ status })
        .end((err, res) => {
          res.should.have.status(422);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it('should return an error if status is invalid', (done) => {
      const orderId = 1;
      const status = null;
      chai.request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send({ status })
        .end((err, res) => {
          res.should.have.status(422);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('Order model', () => {
    it('should instantiate a new order object', () => {
      const tempOrder = new Order({ orderDate });
      expect(tempOrder.orderDate).equal(orderDate);
      expect(tempOrder).to.be.an.instanceOf(Order);
    });
  });
});
