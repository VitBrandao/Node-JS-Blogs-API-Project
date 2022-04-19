const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const createJwtToken = (displayName, password) => {
  const newToken = jwt.sign({ displayName, password }, SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return newToken;
};

module.exports = createJwtToken;
