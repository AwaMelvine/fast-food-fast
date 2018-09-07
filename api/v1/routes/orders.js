import express from 'express';
import * as ordersController from '../controllers/orders';
import validateOrder from '../helpers/validateOrder';

const router = express.Router();


router.get('/', ordersController.getAllOrders);
router.get('/:orderId', ordersController.getOrderById);
router.post('/', validateOrder, ordersController.placeOrder);
router.put('/:orderId', ordersController.updateOrderStatus);


export default router;
