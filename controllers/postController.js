const express = require('express');
const { BlogPost } = require('../models');
const postServices = require('../services/postServices');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

// Req.7
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;
//   const { dataValues } = req.user;
  try {
    const verify = await postServices.postVerifications(req.body);
    if (verify.message) return res.status(400).json(verify);

    const tokenValidation = await validateToken(authorization);
    if (tokenValidation.message) return res.status(401).json(tokenValidation);

    // const userId = dataValues.id;
    await BlogPost.create({ title, content }); // userId
    const newPostCategory = await BlogPost.findOne({ where: { title } });
    return res.status(201).json(newPostCategory);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

module.exports = router;