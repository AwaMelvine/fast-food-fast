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

      try {
        const user = await User.findById(decoded.id);

        req.user = {
          id: user.id,
          role: user.role,
        };
        next();
        return user;
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    } catch (error) {
      return res.status(401).json({ error: 'Failed to authenticate' });
    }
  },

  async admin(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      try {
        const user = await User.findById(decoded.id);

        if (user.role !== 'admin') {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = {
          id: user.id,
          role: user.role,
        };
        next();
        return user;
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    } catch (error) {
      return res.status(401).json({ error: 'Failed to authenticate' });
    }
  },
};
