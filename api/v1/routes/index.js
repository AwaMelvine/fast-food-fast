import { Router } from 'express';
import auth from './auth';
import orders from './orders';
import users from './users';
import categories from './categories';
import foodItems from './foodItems';

const router = new Router();

router.use('/api/v1/auth', auth);
router.use('/api/v1/orders', orders);
router.use('/api/v1/users', users);
router.use('/api/v1/categories', categories);
router.use('/api/v1/menu', foodItems);


// router.use('/*', (req, res) => {
//   res.status(404).json({ message: 'Page Not Found. Please go to /api/v1/orders to use our api' });
// });

export default router;
