import { DataTypes } from 'sequelize';
import core from '../../core';

const sequelize = core.sequelize.db;

export const ProductStatus = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
};

export const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['active', 'inactive'],
    defaultValue: 'active',
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'product', // default to plural, so we need to define
});

// implements class level method
// do we need to define the class level method?
/**
 * Get a product by condition
 * @param {Object} condition
 */
Product.getAll = (condition = {}) => Product.findAll({ where: condition });

// /**
//  * Update product
//  * @param {integer} id
//  * @param {Object} data
//  */
// Product.update = (id, data) => Product.update(data, { where: { product_id: id } });

/**
 * Get a product by id
 * @param {integer} id
 */
Product.getById = id => Product.findOne({ where: { product_id: id } });

export default { Product, ProductStatus };
