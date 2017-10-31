import express from 'express';
import { validateLogin, jwtAuth, loginAuth } from './middleware';
import { UserController } from './controller';
import core from '../core';

const routes = express.Router();
const { wrap } = core.utils;

/**
 * POST /login
 * Authenticate user
 */
routes.post('/users/login',
  validateLogin(),
  loginAuth(),
  wrap(UserController.getUser));

/**
 * GET /profile/:id*?
 * View user profile
 */
routes.get('/users/:id*?',
  jwtAuth(),
  wrap(UserController.getUser));

routes.post('/users/login',
  validateLogin(),
  jwtAuth(),
  wrap(UserController.getUser));

export default routes;
