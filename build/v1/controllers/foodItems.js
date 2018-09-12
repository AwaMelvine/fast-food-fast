'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFoodItem = exports.updateFoodItem = exports.createFoodItem = exports.getFoodItemById = exports.getAllFoodItems = undefined;

var _functions = require('../helpers/functions');

var _FoodItem = require('../models/FoodItem');

var getAllFoodItems = exports.getAllFoodItems = function getAllFoodItems(req, res) {
  res.status(200).json(_FoodItem.allFoodItems);
};

// Import data structure for food items
var getFoodItemById = exports.getFoodItemById = function getFoodItemById(req, res) {
  var foodItemId = (0, _functions.toInt)(req.params.foodItemId);
  if (!foodItemId) {
    res.status(422).send({ errors: { foodItemId: 'Food Item Id is required' } });
  }

  var foodItem = _FoodItem.allFoodItems.find(function (item) {
    return item.id === foodItemId;
  });
  res.status(200).json(foodItem);
};

var createFoodItem = exports.createFoodItem = function createFoodItem(req, res) {
  var foodItem = new _FoodItem.FoodItem(req.body);
  _FoodItem.allFoodItems.push(foodItem);

  res.status(200).json(_FoodItem.allFoodItems);
};

var updateFoodItem = exports.updateFoodItem = function updateFoodItem(req, res) {
  var foodItemId = (0, _functions.toInt)(req.params.foodItemId);
  if (!foodItemId) {
    res.status(422).send({ errors: { foodItemId: 'Food Item Id is required' } });
  }

  var previousFoodItem = _FoodItem.allFoodItems.find(function (item) {
    return (0, _functions.toInt)(item.id) === foodItemId;
  });
  var updatedFoodItem = Object.assign(previousFoodItem, req.body);

  var index = _FoodItem.allFoodItems.findIndex(function (item) {
    return (0, _functions.toInt)(item.id) === previousFoodItem.id;
  });
  var updatedFoodItems = _FoodItem.allFoodItems.splice(index, 1, updatedFoodItem);

  Object.assign(_FoodItem.allFoodItems, updatedFoodItems);
  res.status(201).json(updatedFoodItem);
};

var deleteFoodItem = exports.deleteFoodItem = function deleteFoodItem(req, res) {
  var foodItemId = (0, _functions.toInt)(req.params.foodItemId);
  var index = _FoodItem.allFoodItems.findIndex(function (item) {
    return (0, _functions.toInt)(item.id) === foodItemId;
  });

  _FoodItem.allFoodItems.splice(index, 1);
  res.status(204).json(_FoodItem.allFoodItems);
};
//# sourceMappingURL=foodItems.js.map