# fast-food-fast

Fast-Food-Fast​ is a food delivery service app for a restaurant. 

[![Coverage Status](https://coveralls.io/repos/github/AwaMelvine/fast-food-fast/badge.svg?branch=develop)](https://coveralls.io/github/AwaMelvine/fast-food-fast?branch=develop)
[![Build Status](https://travis-ci.com/AwaMelvine/fast-food-fast.svg?branch=develop)](https://travis-ci.com/AwaMelvine/fast-food-fast)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2164d7c8ac20aa53652/maintainability)](https://codeclimate.com/github/AwaMelvine/fast-food-fast/maintainability)


## Fast-Food-Fast API

Version 1 (v1) of the Fast-Food-Fast API is hosted on Heroku at: `https://fast-food-fast-service.herokuapp.com/api/v1/orders` and has the following endpoints.

### Orders Endpoints

| Endpoint                 | Request Method | Parameters  |
| ------------------------ |:--------------:| :----------:|
| /api/v1/orders           | GET            |             |
| /api/v1/orders/:orderId  | GET            |   orderId   |
| /api/v1/orders           | POST           |             |
| /api/v1/orders/:orderId  | PUT            |    orderId  |


### Food Items Endpoints

| Endpoint                       | Request Method | Parameters  |
| ------------------------------ |:--------------:| :----------:|
| /api/v1/foodItems              | GET            |             |
| /api/v1/foodItems/:foodItemId  | GET            |   orderId   |
| /api/v1/foodItems              | POST           |             |
| /api/v1/foodItems/:foodItemId  | PUT            |    orderId  |
| /api/v1/foodItems/:foodItemId  | DELETE         |    orderId  |



## Examples - Orders

#### Get all Orders
URL: `https://fast-food-fast-service.herokuapp.com/api/v1/orders`
Request Type: GET

#### Place new order
URL: `https://fast-food-fast-service.herokuapp.com/api/v1/orders`
Request Type: POST
Data: 
```
{
  "id": 1,
  "customerId": 12,
  "itemId": 5,
  "quantity": 3,
  "totalPrice": 4000,
  "orderDate": "03-09-2018",
  "dateToDeliver": "04-09-2018",
  "orderStatus": "PROCESSING"
}
```
#### Get specific Order
URL: `https://fast-food-fast-service.herokuapp.com/api/v1/orders/1`
Request type: GET

#### Update Order status
URL: `https://fast-food-fast-service.herokuapp.com/api/v1/orders/1`
Request type: PUT
Data: `{ status: 'COMPLETED' }`
