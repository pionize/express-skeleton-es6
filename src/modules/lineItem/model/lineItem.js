import { DataTypes } from 'sequelize';

import core from '../../core';

const sequelize = core.sequelize.db;

export const LineItemType = {
  PRODUCT: 'product',
  COUPON: 'coupon',
};

export const LineItem = sequelize.define('line_item', {
  line_item_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  entity_type: {
    type: DataTypes.ENUM,
    values: ['product', 'coupon', 'shipping'],
    defaultValue: 'product',
    allowNull: false,
  },
  entity_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
  quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 1,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  order_id: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  created_at: {
    type: DataTypes.DATE(),
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
  },
  updated_at: {
    type: DataTypes.DATE(),
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
  },
}, {
  timestamps: true,
  underscored: true,
});

LineItem.getById = id => LineItem.findOne({ where: { line_item_id: id } });

LineItem.getAll = (condition = {}) => LineItem.findAll({ where: condition });

// eslint-disable-next-line
LineItem.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

export default { LineItem };
