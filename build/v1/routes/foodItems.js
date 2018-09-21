'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _foodItems = require('../controllers/foodItems');

var foodItemsController = _interopRequireWildcard(_foodItems);

var _validateFoodItem = require('../helpers/validateFoodItem');

var _validateFoodItem2 = _interopRequireDefault(_validateFoodItem);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', foodItemsController.getAllFoodItems);
router.get('/:foodItemId', foodItemsController.getFoodItemById);
router.post('/', _validateFoodItem2.default, foodItemsController.createFoodItem);
router.put('/:foodItemId', _validateFoodItem2.default, foodItemsController.updateFoodItem);
router.delete('/:foodItemId', foodItemsController.deleteFoodItem);

exports.default = router;
//# sourceMappingURL=foodItems.js.map