const nameVerification = async (name) => {
  if (!name || name === undefined || name === null) {
    return { message: '"name" is required' };
  }

  return 'Name is Valid!';
};

module.exports = {
  nameVerification,
};
