import express from 'express';
import * as foodItemsController from '../controllers/foodItems';

const router = express.Router();


router.get('/', foodItemsController.getAllFoodItems);


export default router;
