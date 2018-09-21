'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _orders = require('../controllers/orders');

var ordersController = _interopRequireWildcard(_orders);

var _validateOrder = require('../helpers/validateOrder');

var _validateOrder2 = _interopRequireDefault(_validateOrder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', ordersController.getAllOrders);
router.get('/:orderId', ordersController.getOrderById);
router.post('/', _validateOrder2.default, ordersController.placeOrder);
router.put('/:orderId', ordersController.updateOrderStatus);

exports.default = router;
//# sourceMappingURL=orders.js.map