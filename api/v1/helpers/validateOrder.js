export default (req, res, next) => {
  const errors = {};
  const order = req.body;

  if (!order.customerId) {
    errors.customerId = 'Customer Id required';
  }
  if (!order.itemId) {
    errors.itemId = 'Item required';
  }
  if (!order.quantity) {
    errors.quantity = 'Quantity required';
  }
  if (!order.totalPrice) {
    errors.totalPrice = 'Price required';
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(422).json({ errors });
  }
  next();
};
