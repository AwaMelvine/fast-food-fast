'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Order = exports.allOrders = undefined;

var _functions = require('../helpers/functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allOrders = exports.allOrders = [];

var Order = exports.Order = function Order(order) {
  _classCallCheck(this, Order);

  this.id = order.id ? (0, _functions.toInt)(order.id) : 0;
  this.customerId = order.customerId ? order.customerId.toString() : null;
  this.itemId = order.itemId ? (0, _functions.toInt)(order.itemId) : 0;
  this.quantity = order.quantity ? (0, _functions.toInt)(order.quantity) : 0;
  this.totalPrice = order.totalPrice ? (0, _functions.toInt)(order.totalPrice) : 0;
  this.orderDate = order.orderDate ? order.orderDate : null;
  this.dateToDeliver = order.dateToDeliver || null;
  this.orderStatus = order.orderStatus ? order.orderStatus.toString() : null;
};
//# sourceMappingURL=Order.js.map