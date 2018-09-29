import FoodItem from '../models/FoodItem';

export default async (req, res, next) => {
  const errors = {};
  const foodItem = req.body;

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

  // do not perform this check if updating food ite
  if (!req.params.food_item_id && req.method !== 'PUT' && req.method !== 'PATCH') {
    const item = await FoodItem.find({ name: foodItem.name });
    if (item.length > 0) {
      errors.name = 'Food item already exists';
    }
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  next();
};
