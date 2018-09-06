import express from 'express';
import * as ordersController from '../controllers/orders';

const router = express.Router();


router.get('/', ordersController.getAllOrders);
router.get('/:orderId', ordersController.getOrderById);
router.post('/', ordersController.placeOrder);


export default router;
