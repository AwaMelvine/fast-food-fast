import express from 'express';
import * as foodItemsController from '../controllers/foodItems';

const router = express.Router();


router.get('/', foodItemsController.getAllFoodItems);
router.get('/:foodItemId', foodItemsController.getFoodItemById);
router.post('/', foodItemsController.createFoodItem);
router.put('/:foodItemId', foodItemsController.updateFoodItem);
router.delete('/:foodItemId', foodItemsController.deleteFoodItem);


export default router;
