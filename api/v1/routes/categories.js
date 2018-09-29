import express from 'express';
import categoriesController from '../controllers/categories';
import validateCategory from '../helpers/validateCategories';

const router = express.Router();


router.get('/', categoriesController.getAllCategories);
router.get('/:category_id', categoriesController.getCategoryById);
router.post('/', validateCategory.create, categoriesController.createCategory);
router.put('/:category_id', validateCategory.update, categoriesController.updateCategory);
router.delete('/:category_id', categoriesController.deleteCategory);


export default router;
