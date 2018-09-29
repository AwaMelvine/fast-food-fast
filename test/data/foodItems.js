import FoodItem from '../../api/v1/models/FoodItem';

export const allFoodItems = [];

export const initialFoodItem = {
  name: 'Vegetable Salad',
  image: 'http://via.placeholder.com/170x170',
  description: 'A very healthy snack',
  quantity: 200,
  unitPrice: 500,
};

export const foodItem2 = {
  name: 'Rice',
  image: 'http://via.placeholder.com/170x170',
  description: 'Very delicious',
  quantity: 1000,
  unitPrice: 600,
};

// export const modifiedFoodItem2 = {
//   name: 'Hamburger',
//   image: 'http://via.placeholder.com/170x170',
//   description: 'Very delicious',
//   quantity: 1000,
//   unitPrice: 600,
// };

export const modifiedFoodItem2 = {
  name: 'Vegetable',
  image: 'http://via.placeholder.com/170x170',
  description: 'Test description',
  quantity: 200,
  unitPrice: 250,
};

export const created_at = '03-09-2018';

export const foodItemId = 1;

export const invalidFoodItemId = undefined;
