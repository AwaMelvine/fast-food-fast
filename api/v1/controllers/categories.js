import { toInt } from '../helpers/functions';

// Import data structure for categories
import { allCategories, Category } from '../models/Category';

export default {

  getAllCategories(req, res) {
    res.status(200).json(allCategories);
  },

  getCategoryById(req, res) {
    const categoryId = toInt(req.params.categoryId);
    if (!categoryId) {
      res.status(422).send({ errors: { categoryId: 'Category Id is required' } });
    }

    const category = allCategories.find(item => item.id === categoryId);
    res.status(200).json(category);
  },

  createCategory(req, res) {
    const category = new Category(req.body);
    allCategories.push(category);

    res.status(200).json(allCategories);
  },

  updateCategory(req, res) {
    const categoryId = toInt(req.params.categoryId);
    if (!categoryId) {
      res.status(422).send({ errors: { categoryId: 'Food Item Id is required' } });
    }

    const previousCategory = allCategories.find(item => toInt(item.id) === categoryId);
    const updatedCategory = Object.assign(previousCategory, req.body);

    const index = allCategories.findIndex(item => toInt(item.id) === previousCategory.id);
    const updatedCategories = allCategories.splice(index, 1, updatedCategory);


    Object.assign(allCategories, updatedCategories);
    res.status(201).json(updatedCategory);
  },

  deleteCategory(req, res) {
    const categoryId = toInt(req.params.categoryId);
    const index = allCategories.findIndex(item => toInt(item.id) === categoryId);

    allCategories.splice(index, 1);
    res.status(204).json(allCategories);
  },
};
