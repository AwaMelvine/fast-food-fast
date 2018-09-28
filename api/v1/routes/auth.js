import express from 'express';
import usersController from '../controllers/users';
import { validateUser, validateUserLogin } from '../helpers/validateUser';

const router = express.Router();

router.post('/signup', validateUser, usersController.signUp);
router.post('/login', validateUserLogin, usersController.login);
router.get('/logout', usersController.logout);

export default router;
