import chai, { expect } from 'chai';
import { Order } from '../../api/v1/models/Order';
import { orderDate } from '../data/orders';

describe('Order model', () => {
  it('should instantiate a new order object', () => {
    const tempOrder = new Order({ orderDate });
    expect(tempOrder.orderDate).equal(orderDate);
    expect(tempOrder).to.be.an.instanceOf(Order);
  });
});
