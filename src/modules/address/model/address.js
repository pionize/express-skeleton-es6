import { DataTypes } from 'sequelize';
import core from '../../core';
import user from '../../user';

const sequelize = core.sequelize.db;
const { User } = user.model;

export const Address = sequelize.define('Address', {
  address_id: {
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
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  underscored: true,
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'address', // default to plural, so we need to define
});

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

Address.belongsTo(User, { targetKey: 'user_id', foreignKey: 'user_id', as: 'user' });

// implements class level method
// do we need to define the class level method?
/**
 * Get a product by condition
 * @param {Object} condition
 */
Address.getAll = (condition = {}) => Address.findAll({
  where: condition,
  include: [
    { model: User, as: 'user' }, // load all pictures
  ],
});

// /**
//  * Update product
//  * @param {integer} id
//  * @param {Object} data
//  */
// Address.update = (id, data) => Address.update(data, { where: { product_id: id } });

/**
 * Get a product by id
 * @param {integer} id
 */
Address.getById = id => Address.findOne({ where: { address_id: id } });

export default { Address };
