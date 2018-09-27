import jwt from 'jsonwebtoken';
import config from '../../config';

async function decodeToken(token) {
  const { err, decoded } = await jwt.verify(token, config.jwtSecret);
  if (err) {
    return false;
  }
  return decoded;
}

export default {
  user(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({ error: 'No token provided' });
    }

    const userInfo = decodeToken(token);
    if (!userInfo) {
      res.status(401).json({ error: 'Failed to authenticate' });
    }
    next();
  },

  admin(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(403).json({ error: 'No token provided' });
    }

    const userInfo = decodeToken(token);

    if (!userInfo) {
      res.status(401).json({ error: 'Failed to authenticate' });
    } else if (userInfo.role !== 'admin') {
      res.status(401).json({ error: 'Unauthorized' });
    }

    next();
  },
};
