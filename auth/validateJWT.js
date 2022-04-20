const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const validateToken = async (token) => {
  if (!token) return { message: 'Token not found' };
  
  let notAuthorized = false;
  
  jwt.verify(token, SECRET, (err) => {
    if (err) notAuthorized = true;
  });

  if (notAuthorized === true) return { message: 'Expired or invalid token' };

  return 'Authorized!';
};

module.exports = validateToken;
