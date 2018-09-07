import { toInt } from '../helpers/functions';

// Import data structure for food items
import { allFoodItems, FoodItem } from '../models/FoodItem';

export const getAllFoodItems = (req, res) => {
  res.status(200).json(allFoodItems);
};
