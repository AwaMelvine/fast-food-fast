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

export const createFoodItem = (req, res) => {
  const foodItem = new FoodItem(req.body);
  allFoodItems.push(foodItem);

  res.status(200).json(allFoodItems);
};

export const updateFoodItem = (req, res) => {
  const foodItemId = toInt(req.params.foodItemId);
  if (!foodItemId) {
    res.status(422).send({ errors: { foodItemId: 'Food Item Id is required' } });
  }

  const previousFoodItem = allFoodItems.find(item => toInt(item.id) === foodItemId);
  const updatedFoodItem = Object.assign(previousFoodItem, req.body);


  const updatedFoodItems = allFoodItems.map((item) => {
    if (item.id === foodItemId) {
      return updatedFoodItem;
    }
    return item;
  });

  Object.assign(allFoodItems, updatedFoodItems);
  res.status(201).json(updatedFoodItem);
};


export const deleteFoodItem = (req, res) => {
  const foodItemId = toInt(req.params.foodItemId);
  const index = allFoodItems.findIndex(item => toInt(item.id) === foodItemId);

  allFoodItems.splice(index, 1);
  res.status(204).json(allFoodItems);
};
