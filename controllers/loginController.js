const express = require('express');
const loginServices = require('../services/loginServices');
const createToken = require('../auth/createJWT');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const verify = await loginServices.postVerifications(req.body);
    if (verify.message) return res.status(400).json(verify);

    const jwtToken = createToken(email, password);
    return res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
});

module.exports = router;