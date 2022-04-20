const loginMiddlewares = require('../middlewares/loginMiddlewares');

const postVerifications = async (body) => {
  const { email, password } = body;

  const verifyPassword = await loginMiddlewares.passwordValidation(password);
  if (verifyPassword.message) return verifyPassword;

  const verifyEmail = await loginMiddlewares.emailValidation(email);
  if (verifyEmail.message) return verifyEmail;

  return 'All fields are valid!';
};

module.exports = {
  postVerifications,
};
