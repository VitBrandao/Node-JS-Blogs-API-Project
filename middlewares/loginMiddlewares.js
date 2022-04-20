const { User } = require('../models');

const doesUserExists = async (email) => {
  const findUser = await User.findOne({ where: { email } });

  if (!findUser || findUser === null) return false;
  if (findUser) return true;
};

const emailValidation = async (email) => {
  if (email === undefined) return { message: '"email" is required' };

  if (!email || email.length === 0) return { message: '"email" is not allowed to be empty' };

  const verifyUser = await doesUserExists(email);
  if (verifyUser === false) return { message: 'Invalid fields' };

  return 'Email is Valid!';
};

const passwordValidation = async (password) => {
  if (password === undefined) return { message: '"password" is required' };

  if (!password || password.length === 0) {
    return { message: '"password" is not allowed to be empty' };
  }

  return 'Password is Valid!';
};

module.exports = {
  emailValidation,
  passwordValidation,
};
