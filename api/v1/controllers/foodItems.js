import { toInt } from '../helpers/functions';

// Import data structure for food items
import { allFoodItems, FoodItem } from '../models/FoodItem';

export const getAllFoodItems = (req, res) => {
  res.status(200).json(allFoodItems);
};

export const getFoodItemById = (req, res) => {
  const foodItemId = toInt(req.params.foodItemId);
  if (!foodItemId) {
    res.status(422).send({ errors: { foodItemId: 'Food Item Id is required' } });
  }

  const foodItem = allFoodItems.find(item => item.id === foodItemId);
  res.status(200).json(foodItem);
};
