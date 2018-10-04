import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

async function decodeToken(req, res) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  // check case where token has expired

  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ error: 'Failed to authenticate' });
    }

    try {
      const user = await User.findById(decoded.id);
      return user;
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  } catch (error) {
    return false;
  }
}

export default {
  async user(req, res, next) {
    const user = await decodeToken(req, res);

    req.user = {
      id: user.id,
      role: user.role,
    };
    next();
  },

  async admin(req, res, next) {
    const user = await decodeToken(req, res);

    if (user.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };
    next();
  },
};
