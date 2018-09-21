'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderStatus = exports.placeOrder = exports.getOrderById = exports.getAllOrders = undefined;

var _functions = require('../helpers/functions');

var _Order = require('../models/Order');

var getAllOrders = exports.getAllOrders = function getAllOrders(req, res) {
  res.status(200).json(_Order.allOrders);
};

// Import data structure for orders
var getOrderById = exports.getOrderById = function getOrderById(req, res) {
  var orderId = (0, _functions.toInt)(req.params.orderId);
  if (!orderId) {
    res.status(422).send({ errors: { orderId: 'Order Id is required' } });
  }

  var order = _Order.allOrders.find(function (item) {
    return item.id === orderId;
  });
  res.status(200).json(order);
};

var placeOrder = exports.placeOrder = function placeOrder(req, res) {
  var order = new _Order.Order(req.body);
  _Order.allOrders.push(order);

  res.status(200).json(_Order.allOrders);
};

var updateOrderStatus = exports.updateOrderStatus = function updateOrderStatus(req, res) {
  var orderId = req.params.orderId;
  var status = req.body.status;


  var id = (0, _functions.toInt)(orderId);
  if (!id) {
    return res.status(422).send({ errors: { orderId: 'Order Id is required' } });
  }
  if (!status) {
    return res.status(422).send({ errors: { status: 'Order status is required' } });
  }

  var order = _Order.allOrders.find(function (item) {
    return (0, _functions.toInt)(item.id) === id;
  });

  order.orderStatus = status;
  var index = _Order.allOrders.findIndex(function (item) {
    return (0, _functions.toInt)(item.id) === order.id;
  });
  _Order.allOrders.splice(index, 1, order);

  res.status(201).json(order);
};
//# sourceMappingURL=orders.js.map