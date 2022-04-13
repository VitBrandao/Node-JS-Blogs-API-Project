const express = require('express');

const router = express.Router();

const { User } = require('../models');
const userServices = require('../services/userServices');

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const verify = await userServices.createVerifications(req.body);
    if (verify.message) {
      return res.status(400).json(verify);
    }
    await User.create({ displayName, email, password, image });

    return res.status(201).json();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

module.exports = router;