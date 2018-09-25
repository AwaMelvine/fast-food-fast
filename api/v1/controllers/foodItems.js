// Import data structure for food items
import { allFoodItems, FoodItem } from '../models/FoodItem';

export default {

  getAllFoodItems(req, res) {
    res.status(200).json(allFoodItems);
  },

  getFoodItemById(req, res) {
    const foodItemId = parseInt(req.params.foodItemId, 10);
    if (!foodItemId) {
      res.status(400).send({ errors: { foodItemId: 'A valid food Item Id is required' } });
    }

    const foodItem = allFoodItems.find(item => item.id === foodItemId);
    res.status(200).json(foodItem);
  },

  createFoodItem(req, res) {
    const foodItem = new FoodItem(req.body);
    allFoodItems.push(foodItem);

    res.status(201).json(foodItem);
  },

  updateFoodItem(req, res) {
    const foodItemId = parseInt(req.params.foodItemId, 10);
    if (!foodItemId) {
      res.status(400).send({ errors: { foodItemId: 'A valid food Item Id is required' } });
    }

    const previousFoodItem = allFoodItems.find(item => parseInt(item.id, 10) === foodItemId);
    const updatedFoodItem = { ...previousFoodItem, ...req.body };

    const index = allFoodItems.findIndex(item => parseInt(item.id, 10) === previousFoodItem.id);
    allFoodItems.splice(index, 1, updatedFoodItem);

    res.status(200).json(updatedFoodItem);
  },

  deleteFoodItem(req, res) {
    const foodItemId = parseInt(req.params.foodItemId, 10);
    const index = allFoodItems.findIndex(item => parseInt(item.id, 10) === foodItemId);

    allFoodItems.splice(index, 1);
    res.status(204).json(allFoodItems);
  },
};
