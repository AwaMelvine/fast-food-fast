import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import {
  allOrders,
  initialOrder,
  order2,
  orderId,
  status,
  invalidStatus,
  invalidOrderId,
} from '../data/orders';

chai.use(chaiHttp);


// Initialize test database for test
before((done) => {
  chai.request(app)
    .post('/api/v1/orders')
    .send(initialOrder)
    .set('authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInVzZXJuYW1lIjoiSmFuZSIsImVtYWlsIjoibWVsdmluZWF3YTlAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE1MzgxNDU0MjQsImlhdCI6MTUzODA1OTAyNH0.NlJDTHEOBcZoweNF4GcSfAdHM2Xgg1PNbQ5u1tqJ1Cg')
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

after((done) => {
  // allOrders.length = 0;
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
    it('should return all available orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(1);
          done();
        });
    });
  });

  describe('GET /:orderId - Get order by ID', () => {
    it('should return a json Object', (done) => {
      chai.request(app)
        .get(`/api/v1/orders/${orderId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
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
          expect(res).to.have.status(201);
          expect(res.body.id).equal(1);
          done();
        });
    });

    it('should not place an order with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('PUT /:orderId - Update Order Status', () => {
    it('should update an order status', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send({ status })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);

          expect(res.body.orderStatus).equal('DECLINED');
          done();
        });
    });
    it('should return an error if status is invalid', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/${orderId}`)
        .send({ status: invalidStatus })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });
});
