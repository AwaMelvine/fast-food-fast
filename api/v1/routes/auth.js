import express from 'express';
import usersController from '../controllers/users';
import validateUser from '../helpers/validateUser';

const router = express.Router();

router.post('/signup', validateUser.create, usersController.signUp);
router.post('/login', validateUser.login, usersController.login);
router.get('/logout', usersController.logout);

export default router;
