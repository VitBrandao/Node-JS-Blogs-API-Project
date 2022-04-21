const postMiddlewares = require('../middlewares/postMiddlewares');

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

module.exports = {
  postVerifications,
};
