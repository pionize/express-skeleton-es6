import express from 'express';
import core from '../core';
import user from '../user';
import { validateCreate } from './middleware';
import { AddressController } from './controller';

const routes = express.Router();
const { wrap } = core.utils;
const { jwtAuth } = user.middleware;


routes.post('/addresses',
  jwtAuth(),
  validateCreate(),
  wrap(AddressController.create));

routes.get('/addresses',
  jwtAuth(),
  wrap(AddressController.getAll));

/**
 * GET /addresses/:id
 * View user profile
 */
routes.get('/addresses/:id',
  wrap(AddressController.getById));

export default routes;
