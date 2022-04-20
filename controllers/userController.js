const express = require('express');

const router = express.Router();

const { User } = require('../models');
const userServices = require('../services/userServices');
const createToken = require('../auth/createJWT');
const validateToken = require('../auth/validateJWT');

// Req.1
router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const verify = await userServices.createVerifications(req.body);
    if (verify.message) {
      if (verify.message.includes('already registered')) {
        return res.status(409).json(verify);
      }
      return res.status(400).json(verify);
    }
    await User.create({ displayName, email, password, image });

    const jwtToken = createToken(displayName, password);
    return res.status(201).json({ token: jwtToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

// Req.3
router.get('/', async (req, res) => {
  const { authorization } = req.headers;
  try {
    const tokenValidation = await validateToken(authorization);
    if (tokenValidation.message) return res.status(401).json(tokenValidation);

    const getAllUsers = await User.findAll();
    return res.status(200).json(getAllUsers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

// Req.4
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  try {
    const tokenValidation = await validateToken(authorization);
    if (tokenValidation.message) return res.status(401).json(tokenValidation);

    const getUserById = await User.findByPk(id);
    if (!getUserById) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(getUserById);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

module.exports = router;