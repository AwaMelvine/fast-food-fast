import FoodItem from '../../api/v1/models/FoodItem';

export const allFoodItems = [];

export const initialFoodItem = new FoodItem({
  id: 1,
  name: 'Vegetable Salad',
  image: 'http://via.placeholder.com/170x170',
  description: 'A very healthy snack',
  quantity: 200,
  unitPrice: 500,
  updatedAt: '03-09-2018',
  createdAt: '03-09-2018',
});

export const foodItem2 = {
  id: 2,
  name: 'Hamburger',
  image: 'http://via.placeholder.com/170x170',
  description: 'Very delicious',
  quantity: 1000,
  unitPrice: 600,
  updatedAt: '04-09-2018',
  createdAt: '04-09-2018',
};

export const modifiedFoodItem = {
  id: 2,
  name: 'Hamburger',
  image: 'http://via.placeholder.com/170x170',
  description: 'Very delicious',
  quantity: 1000,
  unitPrice: 600,
  updatedAt: '04-09-2018',
  createdAt: '04-09-2018',
};


export const createdAt = '03-09-2018';

export const foodItemId = 1;

export const invalidFoodItemId = null;
