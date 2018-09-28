import express from 'express';
import ordersController from '../controllers/orders';
import validateOrder from '../helpers/validateOrder';
import authenticate from '../helpers/authenticate';

const router = express.Router();


router.get('/', ordersController.getAllOrders);
router.get('/:orderId', ordersController.getOrderById);
router.post('/', validateOrder, authenticate.user, ordersController.placeOrder);
router.put('/:orderId', ordersController.updateOrderStatus);


export default router;
