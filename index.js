const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController); 
app.use('/login', loginController); 
app.use('/categories', categoriesController);
app.use('/post', postController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}`));