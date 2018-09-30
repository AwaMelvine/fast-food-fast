import chai, { expect } from 'chai';
import Category from '../../api/v1/models/Category';
import { created_at } from '../data/categories';

describe('Category model', () => {
  it('should instantiate a new Category object', () => {
    const tempCategory = new Category({ created_at });
    expect(tempCategory.created_at).equal(created_at);
    expect(tempCategory).to.be.an.instanceOf(Category);
  });
});
