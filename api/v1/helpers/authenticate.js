import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function decodeToken(token) {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}

export default {
  async user(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    const userInfo = await decodeToken(token);
    if (!userInfo) {
      return res.status(401).json({ error: 'Failed to authenticate' });
    }

    req.user = userInfo;
    next();
  },

  async admin(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    const userInfo = await decodeToken(token);

    if (!userInfo) {
      return res.status(401).json({ error: 'Failed to authenticate' });
    }
    if (userInfo.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
  },
};
