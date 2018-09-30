import express from 'express';
import foodItemsController from '../controllers/foodItems';
import validateFoodItem from '../helpers/validateFoodItem';

const router = express.Router();

router.get('/', foodItemsController.getAllFoodItems);
router.get('/:food_item_id', foodItemsController.getFoodItemById);
router.post('/', validateFoodItem.create, foodItemsController.createFoodItem);
router.put('/:food_item_id', validateFoodItem.update, foodItemsController.updateFoodItem);
router.delete('/:food_item_id', foodItemsController.deleteFoodItem);

export default router;
