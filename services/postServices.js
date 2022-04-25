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

const getById = async (id) => {
  const userFields = ['id', 'displayName', 'email', 'image'];

  const findPostById = await BlogPost.findOne({
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
    where: { id },
  });

  if (!findPostById) return { message: 'Post does not exist' };
  return findPostById;
};

module.exports = {
  postVerifications,
  getAll,
  getById,
};
