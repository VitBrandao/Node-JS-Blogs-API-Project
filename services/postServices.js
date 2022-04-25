const postMiddlewares = require('../middlewares/postMiddlewares');
const { BlogPost, Category, User } = require('../models');

const postVerifications = async (body) => {
  const { title, content, categoryIds } = body;

  const titleVerification = await postMiddlewares.titleValidations(title);
  if (titleVerification.message) return titleVerification;

  const contentVerification = await postMiddlewares.contentValidations(content);
  if (contentVerification.message) return contentVerification;

  const categoryIdsVerification = await postMiddlewares.categoryIdsValidations(categoryIds);
  if (categoryIdsVerification.message) return categoryIdsVerification;

  return 'All fields are valid!';
};

const getAll = async () => {
  const userFields = ['id', 'displayName', 'email', 'image'];
  // const categoryFields = ['id', 'name'];

  const findAllPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: userFields,
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return findAllPosts;
};

module.exports = {
  postVerifications,
  getAll,
};
