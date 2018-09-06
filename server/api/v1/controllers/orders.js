import { toInt } from '../helpers/functions';

// Import data structure for orders
import { allOrders, Order } from '../models/Order';

export const getAllOrders = (req, res) => {
  res.status(200).json(allOrders);
};

export const getOrderById = (req, res) => {
  const orderId = toInt(req.params.orderId);
  if (!orderId) {
    res.status(422).send({ errors: { orderId: 'Order Id is required' } });
  }

  const order = allOrders.find(item => item.id === orderId);
  res.status(200).json(order);
};

export const placeOrder = (req, res) => {
  const order = new Order(req.body);
  allOrders.push(order);

  res.status(200).json(allOrders);
};

export const updateOrderStatus = (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const id = toInt(orderId);
  if (!id) {
    return res.status(422).send({ errors: { orderId: 'Order Id is required' } });
  }
  if (!status) {
    return res.status(422).send({ errors: { status: 'Order status is required' } });
  }

  const updatedOrders = allOrders.map((item) => {
    if (item.id === id) {
      item.orderStatus = status;
      return item;
    }
    return item;
  });
  Object.assign(allOrders, updatedOrders);
  res.status(201).json(allOrders);
};
