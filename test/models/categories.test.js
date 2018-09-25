import chai, { expect } from 'chai';
import { Category } from '../../api/v1/models/Category';
import { createdAt } from '../data/categories';

describe('Category model', () => {
  it('should instantiate a new Category object', () => {
    const tempCategory = new Category({ createdAt });
    expect(tempCategory.createdAt).equal(createdAt);
    expect(tempCategory).to.be.an.instanceOf(Category);
  });
});
