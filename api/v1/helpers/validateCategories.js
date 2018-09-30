import Category from '../models/Category';

function basicValidation(category) {
  const errors = {};

  if (!category.name) {
    errors.name = 'Category name is required';
  }
  if (!category.description) {
    errors.description = 'Category Description is required';
  }

  return errors;
}

export default {
  async create(req, res, next) {
    const category = req.body;
    const errors = basicValidation(category);

    const otherCategory = await Category.find({ name: category.name });
    if (otherCategory.length > 0) {
      errors.name = 'A category with that name already exists';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },

  update(req, res, next) {
    const category = req.body;
    const errors = basicValidation(category);

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },

};
