const userMiddlewares = require('../middlewares/userMiddlewares');

const createVerifications = async (body) => {
  const { displayName, password, email } = body;

  const verifyDisplayName = await userMiddlewares.displayNameValidation(displayName);
  if (verifyDisplayName.message) return verifyDisplayName;

  const verifyPassword = await userMiddlewares.passwordValidation(password); 
  if (verifyPassword.message) return verifyPassword;

  const verifyEmail = await userMiddlewares.emailValidation(email);
  if (verifyEmail.message) return verifyEmail;

  return 'All fields are valid!';
};

module.exports = {
  createVerifications,
};
