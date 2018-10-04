import express from 'express';
import usersController from '../controllers/users';
import validateUser from '../helpers/validateUser';
import authenticate from '../helpers/authenticate';


const router = express.Router();

router.get('/', usersController.getAllUsers);
router.post('/', validateUser.create, authenticate.admin, usersController.registerUser);

router.get('/:user_id/orders', authenticate.user, usersController.userOrderHistory);

router.get('/:user_id', usersController.getUserById);
router.put('/:user_id', validateUser.update, authenticate.user, usersController.updateUser);
router.delete('/:user_id', usersController.deleteUser);

export default router;
