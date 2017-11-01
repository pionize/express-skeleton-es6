import express from 'express';
import { ImageController } from './controller';
import core from '../core';
import { validateParam, imagePath } from './middleware';

const routes = express.Router();
const { wrap } = core.utils;
const { apiResponse, auth } = core.middleware;

/**
 * POST /images
 * Upload multi images
 */
routes.post('/images',
  auth(),
  (req, res, next) => {
    req.type = 'image';
    return next();
  },
  validateParam(),
  imagePath(),
  wrap(ImageController.upload),
  apiResponse());

routes.post('/videos',
  auth(),
  (req, res, next) => {
    req.type = 'video';
    return next();
  },
  validateParam(),
  imagePath(),
  wrap(ImageController.upload),
  apiResponse());

export default routes;
