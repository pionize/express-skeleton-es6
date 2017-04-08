import express from 'express';
import passport from 'passport';
import { OrderController } from './controller';
import { validateProduct, validateCheckout, validateCouponApply, validateUpdate, validateGet } from './middleware';
import core from '../core';
import { apiResponse } from '../core/middleware';
import userModule from '../user';

const routes = express.Router();
const { auth } = userModule.middleware;
const { wrap } = core.utils;

/**
 * POST /order
 * Create an order
 */
routes.post('/order',
  passport.authenticate('jwt', {}),
  validateProduct(),
  wrap(OrderController.createOrder),
  apiResponse());

/**
 * GET /order/:id*?
 * View user order
 */
routes.get('/order/:id*?',
  passport.authenticate('jwt', {}),
  validateGet(),
  wrap(OrderController.getOrder),
  apiResponse());

/**
 * PUT /order/:id
 * Update user order
 */
routes.put('/order/:id',
  passport.authenticate('jwt', {}),
  auth('admin'),
  validateUpdate(),
  wrap(OrderController.updateOrder),
  apiResponse());

/**
 * POST /order/apply-coupon
 * Apply a coupon to order
 */
routes.post('/order/apply-coupon',
  passport.authenticate('jwt', {}),
  validateCouponApply(),
  wrap(OrderController.applyCoupon),
  apiResponse());

/**
 * POST /order/checkout
 * Set order to checkout complete
 */
routes.post('/order/checkout',
  passport.authenticate('jwt', {}),
  validateCheckout(),
  validateProduct(),
  wrap(OrderController.checkout),
  apiResponse());

export default routes;
