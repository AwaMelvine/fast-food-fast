import Category from '../models/Category';

export default {

  async getAllCategories(req, res) {
    const allCategories = await Category.find({});
    res.status(200).json(allCategories);
  },

  async getCategoryById(req, res) {
    const { category_id } = req.params;

    if (!category_id || !Number.isInteger(category_id)) {
      res.status(400).send({ errors: { category_id: 'A valid category Id is required' } });
    }

    const category = await Category.findById(category_id);

    if (!category) {
      return res.status(404).send({ errors: { global: 'Category not found' } });
    }
    res.status(200).json(category);
  },

  async createCategory(req, res) {
    const category = new Category(req.body);
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  },

  async updateCategory(req, res) {
    const { category_id } = req.params;
    if (!category_id) {
      res.status(400).send({ errors: { category_id: 'A valid category Id is required' } });
    }

    const category = await Category.findById(category_id);
    category.name = req.body.name;
    category.description = req.body.description;

    const updatedCategory = await category.update();
    res.status(200).json(updatedCategory);
  },

  async deleteCategory(req, res) {
    const { category_id } = req.params;

    if (!category_id) {
      res.status(400).send({ errors: { category_id: 'A valid category Id is required' } });
    }
    await Category.delete(category_id);

    res.status(204).json({ message: 'Category deleted!' });
  },
};
