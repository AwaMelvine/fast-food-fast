import express from 'express';
import categoriesController from '../controllers/categories';

const router = express.Router();


router.get('/', categoriesController.getAllCategories);
router.get('/:categoryId', categoriesController.getCategoryById);
router.post('/', categoriesController.createCategory);
router.put('/:categoryId', categoriesController.updateCategory);
router.delete('/:categoryId', categoriesController.deleteCategory);


export default router;
