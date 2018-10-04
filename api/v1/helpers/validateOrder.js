import validator from 'validator';

const statusEnum = [
  'COMPLETED',
  'CANCELLED',
  'PROCESSING',
  'DECLINED',
  'ACCEPTED',
  'NEW',
];

function basicValidation(order) {
  const errors = {};

  if (order.item_id && Number.isNaN(parseInt(order.item_id, 10))) {
    errors.item_id = 'Food item ID must be a number';
  }

  if (!order.item_id) {
    errors.status = 'Item ID required';
  }

  if (order.quantity && Number.isNaN(parseInt(order.quantity, 10))) {
    errors.quantity = 'Quantity has to be a number';
  }

  if (!order.quantity) {
    errors.quantity = 'Quantity is required';
  }

  if (order.total_price && Number.isNaN(parseInt(order.total_price, 10))) {
    errors.total_price = 'Total Price has to be a number';
  }

  if (!order.total_price) {
    errors.total_price = 'Total price is required';
  }

  if (order.status && !statusEnum.includes(order.status)) {
    errors.status = 'Order status must be either, COMPLETED, CANCELLED, PROCESSING, DECLINED, ACCEPTED, NEW';
  }

  if (!order.status || validator.isEmpty(order.status)) {
    errors.status = 'Order status required';
  }

  return errors;
}

export default {
  create(req, res, next) {
    const order = req.body;
    const errors = basicValidation(order);

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },

  update(req, res, next) {
    const errors = {};
    const order = req.body;

    if (order.status && !statusEnum.includes(order.status)) {
      errors.status = 'Order status must be either, COMPLETED, CANCELLED, PROCESSING, DECLINED, ACCEPTED, NEW';
    }

    if (!order.status || validator.isEmpty(order.status)) {
      errors.status = 'Order status required';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },
};
