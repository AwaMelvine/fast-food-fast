// Import data structure for categories
import { allCategories, Category } from '../models/Category';

export default {

  getAllCategories(req, res) {
    res.status(200).json(allCategories);
  },

  getCategoryById(req, res) {
    const categoryId = parseInt(req.params.categoryId, 10);
    if (!categoryId) {
      res.status(400).send({ errors: { categoryId: 'A valid category Id is required' } });
    }

    const category = allCategories.find(item => item.id === categoryId);
    res.status(200).json(category);
  },

  createCategory(req, res) {
    const category = new Category(req.body);
    allCategories.push(category);

    res.status(201).json(category);
  },

  updateCategory(req, res) {
    const categoryId = parseInt(req.params.categoryId, 10);
    if (!categoryId) {
      res.status(400).send({ errors: { categoryId: 'A valid category Id is required' } });
    }

    const previousCategory = allCategories.find(item => parseInt(item.id, 10) === categoryId);
    const updatedCategory = { ...previousCategory, ...req.body };

    const index = allCategories.findIndex(item => parseInt(item.id, 10) === previousCategory.id);
    allCategories.splice(index, 1, updatedCategory);

    res.status(200).json(updatedCategory);
  },

  deleteCategory(req, res) {
    const categoryId = parseInt(req.params.categoryId, 10);
    const index = allCategories.findIndex(item => parseInt(item.id, 10) === categoryId);

    allCategories.splice(index, 1);
    res.status(204).json(allCategories);
  },
};
