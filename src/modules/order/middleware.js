import validate from 'validate.js';
import moment from 'moment';
import _ from 'lodash';
import constraints from './validation';
import { Product, ProductStatus } from '../product/model';
import { LineItem, LineItemType } from '../line_item/model';
import { Order, OrderStatus } from '../order/model';
import { Coupon, CouponStatus } from '../coupon/model';
import { UserRoles } from '../user/model';

/**
 * Product validate middleware
 */
export function validateProduct() {
  return async (req, res, next) => {
    const hasError = validate(req.body, constraints.createOrder);
    if (hasError) {
      return next(hasError);
    }

    let err;
    const products = req.body.products;
    // eslint-disable-next-line no-restricted-syntax
    for (const data of products) {
      const { product_id, quantity } = data;
      const product = await Product.getById(product_id);
      const productJSON = product.toJSON();

      const newQuantity = productJSON.quantity - quantity;
      if (newQuantity < 0) err = new Error(`Product ${productJSON.name} quantity is not enough`);
      if (productJSON.status !== ProductStatus.ACTIVE) err = new Error(`Product ${productJSON.name} quantity is not available`);
    }
    if (err) {
      return next(err);
    }

    return next();
  };
}

export function validateCouponApply() {
  return async (req, res, next) => {
    const hasError = validate(req.body, constraints.applyCoupon);
    if (hasError) {
      return next(hasError);
    }
    const user = req.user;
    const orders = await Order.get({ status: OrderStatus.CART, user_id: user.user_id });
    if (!orders.length) {
      const err = new Error('Invalid order.');
      return next(err);
    }

    const couponCode = req.body.coupon_code;
    const coupons = await Coupon.get({ code: couponCode, status: CouponStatus.ACTIVE });
    if (!coupons.length) {
      const err = new Error('Invalid coupon.');
      return next(err);
    }
    const coupon = coupons.at(0);

    if (moment().unix() < moment(coupon.get('start_date')).unix() || moment().unix() > moment(coupon.get('end_date')).unix()) {
      const err = new Error('Invalid coupon.');
      return next(err);
    }
    req.order = orders.at(0);
    req.coupon = coupon;
    return next();
  };
}

export function validateCheckout() {
  return async (req, res, next) => {
    const hasError = validate(req.body, constraints.checkout);
    if (hasError) {
      return next(hasError);
    }
    const user = req.user;
    const orders = await Order.get({ status: OrderStatus.CART, user_id: user.user_id });
    if (!orders.length) {
      const err = new Error('Invalid order.');
      return next(err);
    }
    const order = orders.at(0);

    const lineItems = await LineItem.get({ order_id: order.get('order_id') });
    const products = [];
    lineItems.each((lineItem) => {
      if (lineItem.get('entity_type') === LineItemType.PRODUCT) {
        products.push({ product_id: lineItem.get('entity_id'), quantity: lineItem.get('quantity') });
      }
    });

    req.order = order;
    req.body.products = products;
    return next();
  };
}
export function validateUpdate() {
  return async (req, res, next) => {
    const orderStatus = req.body.status || null;
    if (!_.includes(OrderStatus, orderStatus)) {
      return next(new Error('Invalid order status.'));
    }
    return next();
  };
}
export function validateGet() {
  return async (req, res, next) => {
    const user = req.user;
    if (req.params.id) {
      const orderId = req.params.id;
      const order = await Order.getById(orderId);
      if (!order) {
        return next(new Error('Invalid order.'));
      }
      if (user.role === UserRoles.ROLE_USER && order.get('user_id') !== user.user_id) {
        return next(new Error('Invalid order.'));
      }
    }
    return next();
  };
}
