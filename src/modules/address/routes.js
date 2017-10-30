import express from 'express';
import core from '../core';
import user from '../user';
import { validateCreate } from './middleware';
import { AddressController } from './controller';

const routes = express.Router();
const { wrap } = core.utils;
const { apiResponse } = core.middleware;
const { jwtAuth } = user.middleware;


routes.post('/address',
  jwtAuth(),
  // validateCreate(),
  wrap(AddressController.create),
  apiResponse());

routes.get('/address',
  jwtAuth(),
  wrap(AddressController.getAll),
  apiResponse());

export default routes;
