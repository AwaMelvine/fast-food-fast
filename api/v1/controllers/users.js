import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Order from '../models/Order';
import User from '../models/User';

dotenv.config();

function createToken(user) {
  const token = jwt.sign({
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
  }, process.env.JWT_SECRET);

  return token;
}

export default {
  async login(req, res) {
    const { email, password } = req.body;

    let user;
    try {
      const rows = await User.find({ email });
      user = rows[0];
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }


    if (!user) {
      return res.status(400).json({ errors: { global: 'Wrong credentials' } });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = createToken(user);
      return res.status(200).send({ data: token, message: 'Sign in successful' });
    }
    return res.status(400).json({ errors: { global: 'Wrong credentials' } });
  },

  async signUp(req, res) {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);

    let newUser;
    try {
      newUser = await user.save();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    const token = createToken(newUser);
    return res.status(200).json({ data: token, message: 'Signup successful!' });
  },

  async logout(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    await User.blacklistToken(token);
    return res.status(200).json({ message: 'You are now logged out' });
  },

  async getAllUsers(req, res) {
    let users;
    try {
      users = await User.find({});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!users.length) {
      return res.status(200).send({ data: [], message: 'No users yet' });
    }
    return res.status(200).json({ data: users, message: 'success' });
  },

  async getUserById(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    if (!user_id || Number.isNaN(user_id)) {
      return res.status(400).send({ errors: { user_id: 'A valid user Id is required' } });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(200).send({ data: [], message: 'User not found' });
    }

    return res.status(200).json({ data: user, message: 'success' });
  },

  async userOrderHistory(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    if (!user_id || Number.isNaN(user_id)) {
      return res.status(400).send({ errors: { user_id: 'A valid user Id is required' } });
    }

    let user;
    try {
      user = await User.findById(user_id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!user) {
      return res.status(404).send({
        data: [],
        message: 'User not found',
      });
    }

    // only admin or logged in user can view their order history
    if (req.user.id !== user.id || req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Unauthorized!' });
    }

    let orders;
    try {
      orders = await Order.getOrderHistory(user_id);
      return res.status(200).json({ data: orders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async registerUser(req, res) {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.role = 'admin';

    let newUser;
    try {
      newUser = await user.save();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ data: newUser, message: 'Admin user created' });
  },

  async updateUser(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    if (!user_id || Number.isNaN(user_id)) {
      return res.status(400).send({ errors: { user_id: 'A valid user Id is required' } });
    }

    // Confirm old password before update
    let user;
    try {
      user = await User.findById(user_id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!user) {
      return res.status(200).send({ errors: { global: 'User not found' } });
    }

    if (!bcrypt.compareSync(req.body.passwordOld, user.password)) {
      return res.status(400).send({ errors: { passwordOld: 'Old password does not match' } });
    }

    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = bcrypt.hashSync(req.body.password, 10);

    let updatedUser;
    try {
      updatedUser = await user.update();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }


    return res.status(200).json({ data: updatedUser, message: 'User successfully updated' });
  },

  async deleteUser(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    if (!user_id || Number.isNaN(user_id)) {
      return res.status(400).send({ errors: { user_id: 'Invalid user id' } });
    }

    await User.delete(user_id);
    return res.status(204).json({ message: 'User deleted successfully' });
  },

};
