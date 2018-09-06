// Import data structure for orders
import { allOrders, Order } from '../models/Order';

export const getAllOrders = (req, res) => {
  res.status(200).json(allOrders);
};
