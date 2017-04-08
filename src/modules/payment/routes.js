import express from 'express';
import passport from 'passport';
import { PaymentController } from './controller';
import { validatePaymentConfirmation, validatePaymentVerification } from './middleware';
import core from '../core';
import { apiResponse } from '../core/middleware';
import userModule from '../user';

const routes = express.Router();
const { wrap } = core.utils;
const { auth } = userModule.middleware;

/**
 * POST /payment
 * Create payment for order
 */
routes.post('/payment',
  validatePaymentConfirmation(),
  wrap(PaymentController.createPayment),
  apiResponse());

/**
 * GET /payment/:id*?
 * View order payment
 */
routes.get('/payment/:id*?',
  passport.authenticate('jwt', {}),
  auth('admin'),
  wrap(PaymentController.getPayment),
  apiResponse());

/**
 * POST /order/checkout
 * Verify payment order
 */
routes.post('/payment/verify',
  passport.authenticate('jwt', {}),
  auth('admin'),
  validatePaymentVerification(),
  wrap(PaymentController.verifyPayment),
  apiResponse());

export default routes;
