import express from 'express';
import foodItemsController from '../controllers/foodItems';
import validateFoodItem from '../helpers/validateFoodItem';
import authenticate from '../helpers/authenticate';

const router = express.Router();

router.get('/', foodItemsController.getAllFoodItems);
router.post('/search', foodItemsController.searchFoodItems);
router.get('/:food_item_id', foodItemsController.getFoodItemById);
router.post('/', validateFoodItem.create, authenticate.user, authenticate.admin, foodItemsController.createFoodItem);
router.put('/:food_item_id', validateFoodItem.update, authenticate.user, authenticate.admin, foodItemsController.updateFoodItem);
router.delete('/:food_item_id', authenticate.user, authenticate.admin, foodItemsController.deleteFoodItem);

export default router;
