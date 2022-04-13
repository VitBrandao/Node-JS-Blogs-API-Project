// const emailValidation = (email) => {
//   const regex = /\S+@\S+\.\S+/;
//   const isEmailValid = regex.test(email);

//   if (!email || isEmailValid === false) {
//     return { message: 'email is not valid!' };
//   }
// };

const createVerifications = (body) => {
  const { displayName, password } = body; // email

  if (displayName.length < 8 || !displayName) {
    return { message: 'displayName must be 8 characters long!' };
  }
  if (password.length !== 6) return { message: 'password must be 6 characters long' };

  // const verifyEmail = emailValidation(email);
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