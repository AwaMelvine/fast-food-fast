import Order from '../models/Order';
import FoodItem from '../models/FoodItem';

export default {

  async getAllOrders(req, res) {
    const allOrders = await Order.find({});
    res.status(200).json(allOrders);
  },

  async getOrderById(req, res) {
    const order_id = parseInt(req.params.order_id, 10);
    if (!order_id || Number.isNaN(order_id)) {
      res.status(400).send({ errors: { order_id: 'A valid order Id is required' } });
    }

    const order = await Order.findById(order_id);
    res.status(200).json(order);
  },

  async placeOrder(req, res) {
    req.body.customer_id = req.user ? req.user.id : 1; // for testing purposes, use 1 as user id

    const foodItem = await FoodItem.findById(req.body.item_id);
    if (!foodItem) {
      return res.status(404).send({ errors: { global: 'Food item not found' } });
    }

    const order = new Order(req.body);
    const newOrder = await order.save();

    res.status(201).json(newOrder);
  },

  async updateOrderStatus(req, res) {
    const order_id = parseInt(req.params.order_id, 10);
    const { status } = req.body;

    if (!order_id || Number.isNaN(order_id)) {
      return res.status(400).send({ errors: { order_id: 'A valid order Id is required' } });
    }
    if (!status) {
      return res.status(400).send({ errors: { status: 'Order status is required' } });
    }

    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(404).send({ errors: { global: 'Order not found' } });
    }

    order.status = status;
    const newOrder = await order.update();
    res.status(200).json(newOrder);
  },
};
