import Category from '../models/Category';

export default {

  async getAllCategories(req, res) {
    const allCategories = await Category.find({});

    res.status(200).json(allCategories);
  },

  async getCategoryById(req, res) {
    const { categoryId } = req.params;
    if (!categoryId) {
      res.status(400).send({ errors: { categoryId: 'A valid category Id is required' } });
    }

    const category = await Category.findById(categoryId);
    res.status(200).json(category);
  },

  async createCategory(req, res) {
    const category = new Category(req.body);
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  },

  async updateCategory(req, res) {
    const { categoryId } = req.params;
    if (!categoryId) {
      res.status(400).send({ errors: { categoryId: 'A valid category Id is required' } });
    }

    const category = await Category.findById(categoryId);
    category.name = req.body.name;
    category.description = req.body.description;

    const updatedCategory = await category.update();
    res.status(200).json(updatedCategory);
  },

  async deleteCategory(req, res) {
    const { categoryId } = req.params;
    await Category.delete(categoryId);

    res.status(204).json({ message: 'Category deleted!' });
  },
};
