import express from 'express';
import { ProductController } from './controller';
import core from '../core';
import { apiResponse } from '../core/middleware';

const routes = express.Router();
const { wrap } = core.utils;

/**
 * GET /profile/:id*?
 * View user profile
 */
routes.get('/product/:id*?',
  wrap(ProductController.getProduct),
  apiResponse());

export default routes;
