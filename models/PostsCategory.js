module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {},
  { timestamps: false, tableName: 'PostsCategories', underscored: true });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostsCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };

  return PostsCategory;
};
