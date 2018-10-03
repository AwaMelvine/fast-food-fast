import express from 'express';
import foodItemsController from '../controllers/foodItems';
import validateFoodItem from '../helpers/validateFoodItem';
import authenticate from '../helpers/authenticate';

const router = express.Router();

router.get('/', foodItemsController.getAllFoodItems);
router.get('/:food_item_id', foodItemsController.getFoodItemById);
router.post('/', validateFoodItem.create, authenticate.admin, foodItemsController.createFoodItem);
router.put('/:food_item_id', validateFoodItem.update, authenticate.admin, foodItemsController.updateFoodItem);
router.delete('/:food_item_id', authenticate.admin, foodItemsController.deleteFoodItem);

export default router;
