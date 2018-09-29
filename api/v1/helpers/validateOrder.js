export default {
  create(req, res, next) {
    const errors = {};
    const order = req.body;

    if (!order.item_id) {
      errors.item_id = 'Item required';
    }
    if (!order.quantity) {
      errors.quantity = 'Quantity required';
    }
    if (!order.status) {
      errors.status = 'Order status required';
    }
    if (!order.total_price) {
      errors.total_price = 'Price required';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },

  update(req, res, next) {
    const errors = {};
    const order = req.body;

    if (!order.status) {
      errors.status = 'Order status required';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },
};
