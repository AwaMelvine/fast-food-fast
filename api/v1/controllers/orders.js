import Order from '../models/Order';

export default {

  async getAllOrders(req, res) {
    const allOrders = await Order.find({});
    res.status(200).json(allOrders);
  },

  async getOrderById(req, res) {
    const { orderId } = req.params;
    if (!orderId) {
      res.status(400).send({ errors: { orderId: 'A valid order Id is required' } });
    }

    const order = await Order.findById(orderId);
    res.status(200).json(order);
  },

  async placeOrder(req, res) {
    req.body.customerId = req.user.id;
    const order = new Order(req.body);

    const newOrder = await order.save();

    res.status(201).json(newOrder);
  },

  async updateOrderStatus(req, res) {
    const { orderId } = req.params;
    const { status } = req.body;

    const id = parseInt(orderId, 10);
    if (!id) {
      return res.status(400).send({ errors: { orderId: 'Order Id is required' } });
    }
    if (!status) {
      return res.status(400).send({ errors: { status: 'Order status is required' } });
    }

    const order = await Order.findById(orderId);
    order.orderStatus = status;
    const newOrder = await order.update();

    res.status(200).json(newOrder);
  },
};
