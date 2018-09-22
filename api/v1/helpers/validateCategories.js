export default (req, res, next) => {
  const errors = {};
  const category = req.body;

  if (!category.name) {
    errors.name = 'Category name is required';
  }
  if (!category.description) {
    errors.description = 'Category Description is required';
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(422).json({ errors });
  }
  next();
};
