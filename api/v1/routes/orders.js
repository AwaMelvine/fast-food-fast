import express from 'express';
import ordersController from '../controllers/orders';
import validateOrder from '../helpers/validateOrder';
import authenticate from '../helpers/authenticate';


const router = express.Router();

router.get('/', authenticate.user, authenticate.admin, ordersController.getAllOrders);
router.get('/:order_id', authenticate.user, ordersController.getOrderById);
router.post('/', validateOrder.create, authenticate.user, ordersController.placeOrder);
router.put('/:order_id', validateOrder.update, authenticate.user, ordersController.updateOrderStatus);

export default router;
