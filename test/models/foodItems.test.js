import chai, { expect } from 'chai';
import { FoodItem } from '../../api/v1/models/FoodItem';
import { createdAt } from '../data/foodItems';

describe('FoodItem model', () => {
  it('should instantiate a new FoodItem object', () => {
    const tempFoodItem = new FoodItem({ createdAt });
    expect(tempFoodItem.createdAt).equal(createdAt);
    expect(tempFoodItem).to.be.an.instanceOf(FoodItem);
  });
});
