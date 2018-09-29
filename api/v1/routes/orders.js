import express from 'express';
import ordersController from '../controllers/orders';
import validateOrder from '../helpers/validateOrder';

const router = express.Router();

router.get('/', ordersController.getAllOrders);
router.get('/:order_id', ordersController.getOrderById);
router.post('/', validateOrder.create, ordersController.placeOrder);
router.put('/:order_id', validateOrder.update, ordersController.updateOrderStatus);


export default router;
