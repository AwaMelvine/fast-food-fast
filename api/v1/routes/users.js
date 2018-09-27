import express from 'express';
import usersController from '../controllers/users';
import authenticate from '../helpers/authenticate';

const router = express.Router();

router.post('/', authenticate.user, usersController.signUp);

export default router;
