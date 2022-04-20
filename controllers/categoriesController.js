const express = require('express');
const validateToken = require('../auth/validateJWT');
const { Category } = require('../models');
const categoriesServices = require('../services/categoriesServices');

const router = express.Router();

// Req.5
router.post('/', async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;
  try {
    const verify = await categoriesServices.nameVerification(name);
    if (verify.message) return res.status(400).json(verify);

    const tokenValidation = await validateToken(authorization);
    if (tokenValidation.message) return res.status(401).json(tokenValidation);

    await Category.create({ name });
    const newCategory = await Category.findOne({ where: { name } });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

// Req.6
router.get('/', async (req, res) => {
  const { authorization } = req.headers;
  try {
    const tokenValidation = await validateToken(authorization);
    if (tokenValidation.message) return res.status(401).json(tokenValidation);

    const allCategories = await Category.findAll();
    return res.status(200).json(allCategories);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

module.exports = router;