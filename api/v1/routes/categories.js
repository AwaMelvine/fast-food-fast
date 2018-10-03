import express from 'express';
import categoriesController from '../controllers/categories';
import validateCategory from '../helpers/validateCategories';
import authenticate from '../helpers/authenticate';

const router = express.Router();


router.get('/', categoriesController.getAllCategories);
router.get('/:category_id', categoriesController.getCategoryById);
router.post('/', validateCategory.create, authenticate.admin, categoriesController.createCategory);
router.put('/:category_id', validateCategory.update, authenticate.admin, categoriesController.updateCategory);
router.delete('/:category_id', authenticate.admin, categoriesController.deleteCategory);


export default router;
