import validator from 'validator';
import FoodItem from '../models/FoodItem';

function basicItemValidation(foodItem) {
  const errors = {};
  foodItem.name = foodItem.name && validator.trim(foodItem.name);

  if (foodItem.name && !validator.isLength(foodItem.name, { min: 3, max: 255 })) {
    errors.name = 'Item name must have between 3 to 255 characters';
  }
  if (!foodItem.name || validator.isEmpty(foodItem.name)) {
    errors.name = 'Food item name is required';
  }

  if (foodItem.description && foodItem.description.length < 100) {
    errors.description = 'Description must be at least 100 characters';
  }
  if (!foodItem.description || validator.isEmpty(foodItem.description)) {
    errors.description = 'Description of item required';
  }

  if (foodItem.quantity && Number.isNaN(parseInt(foodItem.quantity, 10))) {
    errors.quantity = 'Quantity has to be a number';
  }

  if (!foodItem.quantity) {
    errors.quantity = 'Food Item Quantity required';
  }

  if (foodItem.unit_price && Number.isNaN(parseInt(foodItem.unit_price, 10))) {
    errors.unit_price = 'Price has to be a number';
  }

  if (!foodItem.unit_price) {
    errors.unit_price = 'Price is required';
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

  async update(req, res, next) {
    const foodItem = req.body;
    const errors = basicItemValidation(foodItem);

    const item = await FoodItem.find({ name: foodItem.name });
    if (item.length > 1) {
      errors.name = 'Food item already exists';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },
};
