// Import data structure for orders
import { allOrders, Order } from '../models/Order';

export default {

  getAllOrders(req, res) {
    res.status(200).json(allOrders);
  },

  getOrderById(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    if (!orderId) {
      res.status(400).send({ errors: { orderId: 'Order Id is required' } });
    }

    const order = allOrders.find(item => item.id === orderId);
    res.status(200).json(order);
  },

  placeOrder(req, res) {
    const order = new Order(req.body);
    allOrders.push(order);

    res.status(201).json(order);
  },

  updateOrderStatus(req, res) {
    const { orderId } = req.params;
    const { status } = req.body;

    const id = parseInt(orderId, 10);
    if (!id) {
      return res.status(400).send({ errors: { orderId: 'Order Id is required' } });
    }
    if (!status) {
      return res.status(400).send({ errors: { status: 'Order status is required' } });
    }

    const order = allOrders.find(item => parseInt(item.id, 10) === id);

    order.orderStatus = status;
    const index = allOrders.findIndex(item => parseInt(item.id, 10) === order.id);
    allOrders.splice(index, 1, order);

    res.status(200).json(order);
  },
};
