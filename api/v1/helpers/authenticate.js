import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

export default {
  async user(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ error: 'Failed to authenticate' });
    }
  },

  async admin(req, res, next) {
    const { user } = req;
    if (user.role !== 'admin') {
      return res.status(403).send({ error: 'Unauthorized' });
    }
    return next();
  },
};
