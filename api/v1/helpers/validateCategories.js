import Category from '../models/Category';

export default async (req, res, next) => {
  const errors = {};
  const category = req.body;

  if (!category.name) {
    errors.name = 'Category name is required';
  }
  if (!category.description) {
    errors.description = 'Category Description is required';
  }

  // do not perform this check if updating category
  if (!req.params.categoryId && req.method !== 'PUT' && req.method !== 'PATCH') {
    const otherCategory = await Category.find({ name: category.name });
    if (otherCategory.length > 0) {
      errors.name = 'A category with that name already exists';
    }
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  next();
};
