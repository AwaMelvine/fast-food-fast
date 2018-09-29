import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

async function loginById(user_id) {
  const user = await User.findById(user_id);

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

  async getAllUsers(req, res) {
    const users = await User.find({});
    return res.status(200).json(users);
  },

  async getUserById(req, res) {
    const user_id = parseInt(req.params.order_id, 10);
    if (!user_id || Number.isNaN(user_id)) {
      res.status(400).send({ errors: { user_id: 'A valid user Id is required' } });
    }

    const user = await User.findById(user_id);
    res.status(200).json(user);
  },

  async registerUser(req, res) {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await user.save();

    // If it's a normal user signup (not admin), log that user in
    if (newUser.role === 'user') {
      const token = await loginById(user.id);
      return res.json({ token });
    }

    const users = await User.find({});
    return res.status(201).json(users);
  },

  async updateUser(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    if (!user_id || Number.isNaN(user_id)) {
      return res.status(400).send({ errors: { user_id: 'A valid user Id is required' } });
    }

    // Confirm old password before update
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ errors: { global: 'User not found' } });
    }

    if (!bcrypt.compareSync(req.body.passwordOld, user.password)) {
      return res.status(400).send({ errors: { passwordOld: 'Old password does not match' } });
    }

    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = bcrypt.hashSync(req.body.password, 10);
    const updatedUser = await user.update();
    return res.status(200).json(updatedUser);
  },

  async deleteUser(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    if (!user_id || Number.isNaN(user_id)) {
      return res.status(400).send({ errors: { user_id: 'Invalid user id' } });
    }
    // delete user from db
    await User.delete(user_id);
    return res.status(204).json({ message: 'User deleted successfully' });
  },

};
