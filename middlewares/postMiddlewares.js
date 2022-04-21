const { Category } = require('../models');

const titleValidations = async (title) => {
  if (!title || title === undefined || title === null) {
    return { message: '"title" is required' };
  }

  return 'Title is Valid!';
};

const contentValidations = async (content) => {
  if (!content || content === undefined || content === null) {
    return { message: '"content" is required' };
  }

  return 'Content is Valid!';
};

const categoryIdsValidations = async (categoryIds) => {
  if (!categoryIds || categoryIds === undefined || categoryIds.length === 0) {
    return { message: '"categoryIds" is required' };
  }

  categoryIds.map(async (id) => {
    const find = await Category.findOne({ where: id });
    if (!find || find.length === 0) {
      return { message: '"categoryIds not found' };
    }
  });

  return 'CategoryIds are Valid!';
};

module.exports = {
  titleValidations,
  contentValidations,
  categoryIdsValidations,
};
