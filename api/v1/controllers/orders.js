import Order from '../models/Order';
import FoodItem from '../models/FoodItem';

export default {

  async getAllOrders(req, res) {
    const allOrders = await Order.find({});
    if (!allOrders.length) {
      return res.status(200).send({ data: [], message: 'No orders yet' });
    }
    return res.status(200).json({ data: allOrders, message: 'success' });
  },

  async getOrderById(req, res) {
    const order_id = parseInt(req.params.order_id, 10);
    if (!order_id || Number.isNaN(order_id)) {
      return res.status(400).send({ errors: { order_id: 'A valid order Id is required' } });
    }

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(200).send({ message: 'Order not found' });
    }

    res.status(200).json({ data: order, message: 'success' });
  },

  async placeOrder(req, res) {
    let totalPrice = 0;
    const orderItems = req.body.cart.map((cartItem) => {
      const itemInfo = {
        item_id: cartItem.item.id,
        quantity: cartItem.quantity,
        unit_price: cartItem.item.unit_price,
      };
      totalPrice += cartItem.quantity * cartItem.item.unit_price;
      return itemInfo;
    });

    const orderObj = {
      customer_id: req.user.id,
      total_price: totalPrice,
      status: req.body.status,
    };

    const order = new Order(orderObj);
    const newOrder = await order.save();

    await newOrder.saveOrderItems(orderItems);

    return res.status(201).json({ data: newOrder, message: 'Order placed successfully' });
  },

  async updateOrderStatus(req, res) {
    const order_id = parseInt(req.params.order_id, 10);
    const { status } = req.body;

    if (!order_id || Number.isNaN(order_id)) {
      return res.status(400).send({ errors: { order_id: 'A valid order Id is required' } });
    }

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(200).send({ errors: { global: 'Order not found' } });
    }

    order.status = status;
    const newOrder = await order.update();
    res.status(200).json({ data: newOrder, message: 'Order status updated' });
  },
};
