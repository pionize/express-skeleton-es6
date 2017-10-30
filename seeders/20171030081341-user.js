import user from '../src/modules/user';

const { User } = user.model;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('User', [{
      user_id: 1,
      name: 'admin',
      email: 'andrew@pionize.com',
      password: User.hashPasswordSync('admin'),
      status: 'active',
      role: 'admin',
    }, {
      user_id: 2,
      name: 'guest',
      email: 'guest@pionize.com',
      password: User.hashPasswordSync('guest'),
      status: 'active',
      role: 'user',
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
