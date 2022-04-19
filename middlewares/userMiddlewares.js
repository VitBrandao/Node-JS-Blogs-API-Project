const { User } = require('../models');

const verifyEmailSyntax = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const doesEmailExists = async (email) => {
  const findEmail = await User.findOne({ where: { email } });
  if (findEmail) return false;
  return 'Email does not exists in database';
};

const emailValidation = async (email) => {
  if (!email) return { message: '"email" is required' };

  const isValid = verifyEmailSyntax(email);
  if (isValid === false) return { message: '"email" must be a valid email' };

  const doesExists = doesEmailExists(email);
  if (doesExists === false) return { message: 'User already registered' };

  return 'Email is Valid!';
};

const displayNameValidation = async (displayName) => {
  if (displayName.length < 8 || !displayName || displayName === undefined) {
    return { message: '"displayName" length must be at least 8 characters long' };
  }

  return 'Display Name is Valid!';
};

const passwordValidation = async (password) => {
  if (!password) return { message: '"password" is required' };
  if (password.length !== 6) return { message: '"password" length must be 6 characters long' };
  return 'Password is Valid!';
};

module.exports = {
  emailValidation,
  displayNameValidation,
  passwordValidation,
};
