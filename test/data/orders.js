import { Order } from '../../api/v1/models/Order';

export const initialOrder = new Order({
  id: 1,
  customerId: 12,
  itemId: 5,
  quantity: 2,
  totalPrice: 4000,
  orderDate: '03-09-2018',
  dateToDeliver: '04-09-2018',
  orderStatus: 'PROCESSING',
});

export const order2 = {
  id: 2,
  customerId: 12,
  itemId: 5,
  quantity: 2,
  totalPrice: 4000,
  orderDate: '03-09-2018',
  dateToDeliver: '04-09-2018',
  orderStatus: 'PROCESSING',
};

export const orderDate = '03-09-2018';
