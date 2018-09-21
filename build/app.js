'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _orders = require('./v1/routes/orders');

var _orders2 = _interopRequireDefault(_orders);

var _foodItems = require('./v1/routes/foodItems');

var _foodItems2 = _interopRequireDefault(_foodItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/api/v1/orders', _orders2.default);
app.use('/api/v1/foodItems', _foodItems2.default);

app.use('/', function (req, res) {
  res.status(200).json({ message: 'Check out Fast-Food-Fast api at /api/v1/orders or /api/v1/foodItems' });
});

app.use('/api/v1/', function (req, res) {
  res.status(200).json({ message: 'Welcome to version 1 of Fast Food Fast API.\n\n Go to /api/v1/orders or /api/v1/foodItems to use our api' });
});

app.use('/*', function (req, res) {
  res.status(404).json({ message: 'Page Not Found. Please go to /api/v1/orders to use our api' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, function () {
    return console.log('Server started at localhost:5000');
  });
}

exports.default = app;
//# sourceMappingURL=app.js.map