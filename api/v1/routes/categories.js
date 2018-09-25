import express from 'express';
import categoriesController from '../controllers/categories';
import validateCategory from '../helpers/validateCategories';

const router = express.Router();


router.get('/', categoriesController.getAllCategories);
router.get('/:categoryId', categoriesController.getCategoryById);
router.post('/', validateCategory, categoriesController.createCategory);
router.put('/:categoryId', validateCategory, categoriesController.updateCategory);
router.delete('/:categoryId', categoriesController.deleteCategory);


export default router;
