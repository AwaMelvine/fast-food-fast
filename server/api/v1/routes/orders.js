import express from 'express';
import * as ordersController from '../controllers/orders';

const router = express.Router();


router.get('/', ordersController.getAllOrders);


export default router;
