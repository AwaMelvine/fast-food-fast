import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Order, allOrders } from '../api/v1/models/Order';

process.env.NODE_ENV = 'test'; 

const should = chai.should();
chai.use(chaiHttp);

const initialOrder = new Order({
  id: 1,
  customerId: 12,
  itemId: 5,
  quantity: 2,
  totalPrice: 4000,
  orderDate: '03-09-2018',
  dateToDeliver: '04-09-2018',
  orderStatus: 'PROCESSING',
});

// Initialize test database for test
if (process.env.NODE_ENV === 'test') {
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
} else {
  throw new Error('Attempt to clear non testing database!');
}


describe('Orders', () => {
  describe('GET /orders - Get all orders', () => {
    it('should return a json object', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
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
  });

  describe('POST /orders - Place order', () => {
    const order2 = {
      id: 2,
      customerId: 12,
      itemId: 5,
      quantity: 2,
      totalPrice: 4000,
      orderDate: '03-09-2018',
      dateToDeliver: '04-09-2018',
      orderStatus: 'PROCESSING',
    };

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

          const changedOrder = res.body.find(item => item.id === orderId);
          expect(changedOrder.orderStatus).equal('DECLINED');
          done();
        });
    });
  });
});
