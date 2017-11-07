import { DataTypes } from 'sequelize';
import core from '../../core';
import lineItemModule from '../../lineItem';

const { LineItem } = lineItemModule.model;

export const OrderStatus = {
  CART: 'cart',
  CANCELED: 'canceled',
  CHECKOUT_COMPLETE: 'checkout-complete',
  PENDING_SHIPMENT: 'pending-shipment',
  SHIPPED: 'shipped',
  COMPLETE: 'complete',
};

const sequelize = core.sequelize.db;

export const Order = sequelize.define('order', {
  order_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  order_number: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['cart', 'canceled', 'checkout-complete', 'pending-shipment', 'shipped', 'complete'],
    defaultValue: 'cart',
    allowNull: false,
  },
  shipping_receipt: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  address_id: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  user_id: {
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

Order.hasMany(LineItem, { foreignKey: 'line_item_id', as: 'line_item' });

Order.getById = id => Order.findOne({ where: { order_id: id } });

Order.getAll = (condition = {}) => Order.findAll({
  where: condition,
  include: [
    { model: LineItem, as: 'line_item' },
  ],
});
// TODO: implement hook to decrease the product quantity on order create
// TODO: implement hook to increase the product quantity on order cancel

// eslint-disable-next-line
Order.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

Order.prototype.reloadData = async function () {
  return this.reload({
    plain: true,
    include: [
      { model: LineItem, as: 'line_item' },
    ],
  });
};

export default { Order };
