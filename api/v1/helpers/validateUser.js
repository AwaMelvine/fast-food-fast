import User from '../models/User';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return re.test(String(email).toLowerCase());
}

export const validateUser = async (req, res, next) => {
  const errors = {};
  const user = req.body;

  if (!user.username) {
    errors.username = 'Username is required';
  }
  if (!user.email) {
    errors.email = 'Email is required';
  }
  if (!validateEmail(user.email)) {
    errors.email = 'Email address is not valid!!';
  }
  if (!user.password) {
    errors.password = 'Password is required';
  }
  if (user.password !== user.passwordConf) {
    errors.passwordConf = 'The two passwords do not match';
  }

  // do not perform this check if updating user
  if (!req.params.userId && req.method !== 'PUT' && req.method !== 'PATCH') {
    const otherUser = await User.find({ email: user.email });
    if (otherUser.length > 0) {
      errors.email = 'Email already exists';
    }
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }

  next();
};


export const validateUserLogin = (req, res, next) => {
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
};
