import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';

import core from '../../core';

const sequelize = core.sequelize.db;

// used by bcrypt to generate new salt
// 8 rounds will produce about 40 hashes per second on a 2GHz core
// see: https://www.npmjs.com/package/bcrypt
const SALT_ROUND = 8;

export const UserRoles = {
  ROLE_ADMIN: 'admin',
  ROLE_USER: 'user',
};


export const UserStatus = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
};

export const Status = UserStatus;

export const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['active', 'inactive'],
    defaultValue: 'active',
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'user'],
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE(),
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
  },
  updated_at: {
    type: DataTypes.DATE(),
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()'),
  },
}, {
  timestamps: true,
  underscored: true,
  // tableName: 'user', // default to plural, so we need to define
});

/**
 * Create password hash from plain text synchronously
 * @param {string} str
 */
User.hashPassword = async str => await bcrypt.hash(str, SALT_ROUND);
User.hashPasswordSync = str => bcrypt.hashSync(str, SALT_ROUND);

/**
 * Get a user by id
 * @param {integer} id
 */
User.getById = id => User.findOne({ where: { user_id: id } });

/**
 * Get a user by condition
 * @param {Object} condition
 */
User.getAll = (condition = {}) => User.findAll({ where: condition });

/**
 * Compare plain password with it's hashed password
 * @param {string} plain
 * @return {bool}
 */
// eslint-disable-next-line
User.prototype.checkPassword = function (plain) {
  return bcrypt.compareSync(plain, this.get('password'));
};

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

export default { User };
