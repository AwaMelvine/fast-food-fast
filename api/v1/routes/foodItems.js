import express from 'express';
import foodItemsController from '../controllers/foodItems';
import validateFoodItem from '../helpers/validateFoodItem';

const router = express.Router();


router.get('/', foodItemsController.getAllFoodItems);
router.get('/:foodItemId', foodItemsController.getFoodItemById);
router.post('/', validateFoodItem, foodItemsController.createFoodItem);
router.put('/:foodItemId', validateFoodItem, foodItemsController.updateFoodItem);
router.delete('/:foodItemId', foodItemsController.deleteFoodItem);


export default router;
