'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodItem = exports.allFoodItems = undefined;

var _functions = require('../helpers/functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allFoodItems = exports.allFoodItems = [];

var FoodItem = exports.FoodItem = function FoodItem(foodItem) {
  _classCallCheck(this, FoodItem);

  this.id = foodItem.id ? (0, _functions.toInt)(foodItem.id) : 0;
  this.name = foodItem.name ? foodItem.name.toString() : null;
  this.image = foodItem.image ? foodItem.image.toString() : 'http://via.placeholder.com/170x170';
  this.description = foodItem.description ? foodItem.description.toString() : 0;
  this.quantity = foodItem.quantity ? (0, _functions.toInt)(foodItem.quantity) : 0;
  this.unitPrice = foodItem.unitPrice ? (0, _functions.toInt)(foodItem.unitPrice) : 0;
  this.updatedAt = foodItem.updatedAt || null;
  this.createdAt = foodItem.createdAt || null;
};
//# sourceMappingURL=FoodItem.js.map