import validate from 'validate.js';
import constraints from './validation';
import orderModule from '../order';
import { Payment } from './model';

const { Order } = orderModule.model;

/**
 * Payment validate middleware
 */
export function validatePaymentConfirmation() {
  return async (req, res, next) => {
    const hasError = validate(req.body, constraints.paymentConfirmation);
    if (hasError) {
      return next(hasError);
    }

    return next();
  };
}

/**
 * Verify Payment validate middleware
 */
export function validatePaymentVerification() {
  return async (req, res, next) => {
    const hasError = validate(req.body, constraints.paymentVerify);
    if (hasError) {
      return next(hasError);
    }
    const { payment_confirmation_id, order_number } = req.body;
    const payment = await Payment.getById(payment_confirmation_id);
    if (!payment) {
      const err = new Error('Invalid payment, payment not exist.');
      return next(err);
    }

    const orders = await Order.get({ order_number });
    if (!orders.length) {
      const err = new Error('Invalid order');
      return next(err);
    }
    const order = await orders.at(0).load(['lineItems', 'orderLogs']);
    if (order.get('order_number') !== payment.get('order_number')) {
      const err = new Error('Invalid payment');
      return next(err);
    }
    const lineItems = order.related('lineItems');
    let totalAmount = 0;
    lineItems.each((lineItem) => {
      totalAmount += lineItem.get('total_amount');
    });
    if (totalAmount !== payment.get('amount')) {
      const err = new Error('Invalid payment, amount not valid.');
      return next(err);
    }
    req.order = order;
    req.payment = payment;
    return next();
  };
}

