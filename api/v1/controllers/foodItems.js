import { toInt } from '../helpers/functions';

// Import data structure for food items
import { allFoodItems, FoodItem } from '../models/FoodItem';

export default {

  getAllFoodItems(req, res) {
    res.status(200).json(allFoodItems);
  },

  getFoodItemById(req, res) {
    const foodItemId = toInt(req.params.foodItemId);
    if (!foodItemId) {
      res.status(422).send({ errors: { foodItemId: 'Food Item Id is required' } });
    }

    const foodItem = allFoodItems.find(item => item.id === foodItemId);
    res.status(200).json(foodItem);
  },

  createFoodItem(req, res) {
    const foodItem = new FoodItem(req.body);
    allFoodItems.push(foodItem);

    res.status(200).json(allFoodItems);
  },

  updateFoodItem(req, res) {
    const foodItemId = toInt(req.params.foodItemId);
    if (!foodItemId) {
      res.status(422).send({ errors: { foodItemId: 'Food Item Id is required' } });
    }

    const previousFoodItem = allFoodItems.find(item => toInt(item.id) === foodItemId);
    const updatedFoodItem = Object.assign(previousFoodItem, req.body);

    const index = allFoodItems.findIndex(item => toInt(item.id) === previousFoodItem.id);
    const updatedFoodItems = allFoodItems.splice(index, 1, updatedFoodItem);


    Object.assign(allFoodItems, updatedFoodItems);
    res.status(201).json(updatedFoodItem);
  },

  deleteFoodItem(req, res) {
    const foodItemId = toInt(req.params.foodItemId);
    const index = allFoodItems.findIndex(item => toInt(item.id) === foodItemId);

    allFoodItems.splice(index, 1);
    res.status(204).json(allFoodItems);
  },
};
