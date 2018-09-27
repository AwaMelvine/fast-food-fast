import jwt from 'jsonwebtoken';
import config from '../../config';

async function decodeToken(token) {
  try {
    const decoded = await jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    console.log(error);
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
    next();
  },

  async admin(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(403).json({ error: 'No token provided' });
    }

    const userInfo = await decodeToken(token);

    if (!userInfo) {
      res.status(401).json({ error: 'Failed to authenticate' });
    } else if (userInfo.role !== 'admin') {
      res.status(401).json({ error: 'Unauthorized' });
    }

    next();
  },
};
