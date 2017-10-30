import express from 'express';
import { validateLogin, jwtAuth, loginAuth } from './middleware';
import { UserController } from './controller';
import core from '../core';

const routes = express.Router();
const { wrap } = core.utils;
const { apiResponse } = core.middleware;

/**
 * POST /login
 * Authenticate user
 */
routes.post('/user/login',
  validateLogin(),
  loginAuth(),
  wrap(UserController.getUser),
  apiResponse());

/**
 * GET /profile/:id*?
 * View user profile
 */
routes.get('/user/:id*?',
  jwtAuth(),
  wrap(UserController.getUser),
  apiResponse());

routes.post('/user/login',
  validateLogin(),
  jwtAuth(),
  wrap(UserController.getUser),
  apiResponse());

export default routes;
