import FoodItem from '../models/FoodItem';

function basicItemValidation(foodItem) {
  const errors = {};

  if (!foodItem.name) {
    errors.name = 'Food item name is required';
  }
  if (!foodItem.description) {
    errors.description = 'Item Description is required';
  }
  if (!foodItem.quantity) {
    errors.quantity = 'Food Item Quantity required';
  }
  if (!foodItem.unit_price) {
    errors.unit_price = 'Food item unit price required';
  }

  return errors;
}

export default {
  async create(req, res, next) {
    const foodItem = req.body;
    const errors = basicItemValidation(foodItem);

    const item = await FoodItem.find({ name: foodItem.name });
    if (item.length > 0) {
      errors.name = 'Food item already exists';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },

  update(req, res, next) {
    const foodItem = req.body;
    const errors = basicItemValidation(foodItem);

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },
};
