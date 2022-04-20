const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController); // Req.1
app.use('/login', loginController); // Req.2

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}`));