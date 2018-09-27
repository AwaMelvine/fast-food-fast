import express from 'express';
import usersController from '../controllers/users';

const router = express.Router();

router.post('/signup', usersController.signUp);
router.post('/login', usersController.login);

export default router;
