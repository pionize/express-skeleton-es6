import Promise from 'bluebird';
import moment from 'moment';
import bookshelf from 'bookshelf';
import { Order, OrderStatus } from './model';
import productModule from '../product';
import lineItemModule from '../line_item';
import couponModule from '../coupon';
import addressModule from '../address';
import userModule from '../user';

const { Product } = productModule.model;
const { LineItem, LineItemType } = lineItemModule.model;
const { CouponType } = couponModule.model;
const { Address } = addressModule.model;
const { UserRoles } = userModule.model;

export const OrderController = {};
export default { OrderController };

/**
 * Create order
 */
OrderController.createOrder = async (req, res, next) => {
  const user = req.user;
  let order = await Order.create({
    status: OrderStatus.CART,
    user_id: user.user_id,
  });
  const orderId = order.get('order_id');
  const products = req.body.products;
  // eslint-disable-next-line no-restricted-syntax
  for (const data of products) {
    const { product_id, quantity } = data;
    const product = await Product.getById(product_id);
    await LineItem.create({
      name: product.get('name'),
      entity_type: LineItemType.PRODUCT,
      entity_id: product_id,
      quantity,
      amount: product.get('price'),
      total_amount: quantity * product.get('price'),
      order_id: orderId,
    });
  }

  order = await order.load(['lineItems', 'orderLogs']);

  req.resData = {
    status: true,
    message: 'Order Data',
    data: order,
  };
  return next();
};

/**
 * Apply coupon to order
 */
OrderController.applyCoupon = async (req, res, next) => {
  // const user = req.user;
  let order = req.order;
  const coupon = req.coupon;
  const orderId = order.get('order_id');

  const couponLineItems = await LineItem.get({
    order_id: orderId,
    entity_type: LineItemType.COUPON,
  });
  // delete existing coupon
  if (couponLineItems.length) {
    const couponsLineItemDelete = [];
    couponLineItems.each((couponLineItem) => {
      const couponLineItemId = couponLineItem.get('line_item_id');
      couponsLineItemDelete.push(LineItem.delete(couponLineItemId));
    });
    await Promise.all(couponsLineItemDelete);
  }

  let orderTotal = 0;
  const lineItems = await LineItem.get({ order_id: orderId });
  lineItems.each((lineItem) => {
    orderTotal += lineItem.get('amount');
  });

  let amount;
  if (coupon.get('type') === CouponType.FIXED) {
    amount = parseInt(coupon.get('value'), 16);
  }
  if (coupon.get('type') === CouponType.PERCENTAGE) {
    amount = (orderTotal * parseInt(coupon.get('value'), 16)) / 100;
  }

  const quantity = 1;
  await LineItem.create({
    name: coupon.get('code'),
    entity_type: LineItemType.COUPON,
    entity_id: coupon.get('coupon_id'),
    quantity,
    amount: -amount,
    total_amount: -amount,
    order_id: orderId,
  });

  order = await order.refresh({ withRelated: ['lineItems', 'orderLogs'] });

  req.resData = {
    status: true,
    message: 'Order Data',
    data: order,
  };
  return next();
};

/**
 * Checkout order
 */
OrderController.checkout = async (req, res, next) => {
  // const user = req.user;
  let order = req.order;
  const orderId = order.get('order_id');

  const { name, email, address, phone } = req.body;

  const addressModel = await Address.create({ name, email, address, phone });
  const currentDate = moment().format('YYMMDD');
  await Order.update(orderId, {
    status: OrderStatus.CHECKOUT_COMPLETE,
    address_id: addressModel.get('address_id'),
    order_number: `${currentDate}O${orderId}`,
  });
  order = await order.refresh({ withRelated: ['lineItems', 'orderLogs'] });
  req.resData = {
    status: true,
    message: 'Order Data',
    data: order,
  };
  return next();
};

/**
 * View user order
 */
OrderController.getOrder = async (req, res, next) => {
  const user = req.user;
  let order;
  let collection = false;
  if (req.params.id) {
    order = await Order.getById(req.params.id);
  } else {
    collection = true;
    const condition = {
      order_number: req.query.order_number || null,
      shipping_receipt: req.query.shipping_receipt || null,
    };
    if (user.role === UserRoles.ROLE_USER) condition.user_id = user.user_id;
    order = await Order.get(condition);
  }

  if (!order) {
    const err = new Error('Invalid order');
    return next(err);
  }
  order = await order.load(['lineItems', 'orderLogs']);
  if (collection) {
    // eslint-disable-next-line no-restricted-syntax
    for (const orderData of order.models) {
      await orderData.calculateTotalAmount(orderData);
    }
  } else {
    order.calculateTotalAmount();
  }
  req.resData = {
    status: true,
    message: 'Order Data',
    data: order,
  };
  return next();
};

/**
 * Update user order
 */
OrderController.updateOrder = async (req, res, next) => {
  let order;
  if (req.params.id) {
    order = await Order.getById(req.params.id);
  }
  const orderId = order.get('order_id');
  const orderStatus = req.body.status || null;
  const shippingReceipt = req.body.shipping_receipt || null;

  if (!order) {
    const err = new Error('Invalid order');
    return next(err);
  }
  await Order.update(orderId, { status: orderStatus, shipping_receipt: shippingReceipt });
  order = await order.load(['lineItems', 'orderLogs']);
  req.resData = {
    status: true,
    message: 'Order Data',
    data: order,
  };
  return next();
};
