import validator from 'validator';
import User from '../models/User';


function basicValidation(user) {
  const errors = {};
  user.username = validator.trim(user.username);
  user.email = validator.trim(user.email);

  if (!validator.isAlphanumeric(user.username)) {
    errors.username = 'Username should contain only characters and/or numbers';
  }
  if (!validator.isLength(user.username, { min: 3, max: 255 })) {
    errors.username = 'Username must have between 3 to 255 characters';
  }
  if (validator.isEmpty(user.username)) {
    errors.username = 'Username is required';
  }

  if (!validator.isEmail(user.email)) {
    errors.email = 'Email address is not valid!!';
  }
  if (validator.isEmpty(user.email)) {
    errors.email = 'Email is required';
  }

  if (user.password !== user.passwordConf) {
    errors.password = 'The two passwords do not match';
  }

  if ((user.password && user.password.length < 6) || validator.isAlpha(user.password)) {
    errors.password = 'Password must be at least 6 characters long and contain at least a number';
  }
  if (validator.isEmpty(user.password)) {
    errors.password = 'Password is required';
  }

  return errors;
}

export default {
  async create(req, res, next) {
    const user = req.body;
    const errors = basicValidation(user);

    const otherUser = await User.find({ email: user.email });
    if (otherUser.length > 0) {
      errors.email = 'Email already exists';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }

    next();
  },
  update(req, res, next) {
    const user = req.body;
    const errors = basicValidation(user);

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },


  login(req, res, next) {
    const errors = {};
    const user = req.body;

    if (!user.email) {
      errors.username = 'Username or Email is required';
    }
    if (!user.password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  },
};
