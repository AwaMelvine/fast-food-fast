import express from 'express';
import * as foodItemsController from '../controllers/foodItems';

const router = express.Router();


router.get('/', foodItemsController.getAllFoodItems);
router.get('/:foodItemId', foodItemsController.getFoodItemById);
router.post('/', foodItemsController.createFoodItem);


export default router;
