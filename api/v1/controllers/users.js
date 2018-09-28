import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

async function loginById(userId) {
  const user = await User.findById(userId);

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
  }, process.env.JWT_SECRET);

  return token;
}

export default {
  async login(req, res) {
    const { email, password } = req.body;
    const rows = await User.find({ email });
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ errors: { global: 'Wrong credentials' } });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = await loginById(user.id);
      return res.status(200).json({ token });
    }
    return res.status(400).json({ errors: { global: 'Wrong credentials' } });
  },

  logout(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    User.blacklistToken(token);
    res.status(200).json({});
  },

  async signUp(req, res) {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await user.save();

    const token = await loginById(newUser.id);
    return res.status(200).json({ token });
  },

};
