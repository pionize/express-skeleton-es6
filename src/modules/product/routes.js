import express from 'express';
import { ProductController } from './controller';
import core from '../core';
import { apiResponse } from '../core/middleware';

const routes = express.Router();
const { wrap } = core.utils;

/**
 * GET /product/:id
 * View user profile
 */
routes.get('/product/:id',
  wrap(ProductController.getProductById));

/**
 * GET /profile
 * View user profile
 */
routes.get('/product',
  wrap(ProductController.getAllProduct));

export default routes;
