import { Category } from '../../api/v1/models/Category';

export const initialCategory = new Category({
  id: 1,
  name: 'Salads',
  description: 'Healthy!!!',
  updatedAt: '03-09-2018',
  createdAt: '03-09-2018',
});


export const category2 = {
  id: 2,
  name: 'Grains',
  description: 'Very delicious',
  updatedAt: '04-09-2018',
  createdAt: '04-09-2018',
};


export const modifiedCategory2 = {
  id: 2,
  name: 'African cuisine',
  description: 'Only in Africa',
  updatedAt: '04-09-2018',
  createdAt: '04-09-2018',
};


export const createdAt = '03-09-2018';
