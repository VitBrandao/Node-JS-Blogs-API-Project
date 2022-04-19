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

/*
O campo displayName deverá ser uma string com no mínimo de 8 caracteres;

O campo email será considerado válido se tiver o formato <prefixo>@<domínio> e se for único. Ele é obrigatório.

A senha deverá conter 6 caracteres. Ela é obrigatória.

Caso exista uma pessoa com o mesmo email na base, deve-se retornar o seguinte erro:

{
  "message": "User already registered"
}
*/