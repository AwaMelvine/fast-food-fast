// Import data structure for orders
import { allOrders, Order } from '../models/Order';

export const getAllOrders = (req, res) => {
  res.status(200).json(allOrders);
};

export const getOrderById = (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);
  if (!orderId) {
    res.status(422).send({ errors: { orderId: 'Order Id is required' } });
  }

  const order = allOrders.find(item => item.id === orderId);
  res.status(200).json(order);
};
