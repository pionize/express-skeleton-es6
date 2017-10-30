import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import statusMonitor from 'express-status-monitor';
import responseTime from 'response-time';
import config from '../config';
import c from './constants';
import core from './modules/core';
import user from './modules/user';
import product from './modules/product';
import address from './modules/address';

const app = express();

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log('Unhandled Rejection:', err.stack);
});

app.use(statusMonitor());
app.use(responseTime());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(config.publicPath, { maxAge: c.ONE_YEAR }));

app.set('trust proxy', 1);

// configure passport middleware
// this must be defined after session middleware
// see: http://passportjs.org/docs#middleware
user.passport.configure(app);

// set default express behavior
// disable x-powered-by signature
// and enable case-sensitive routing
app.set('env', config.env);
app.set('x-powered-by', false);
app.set('case sensitive routing', true);

// configure middleware
app.use(core.middleware.requestLoggerMiddleware());
app.use(core.middleware.requestUtilsMiddleware());
app.use(core.middleware.apiResponse());

app.use(core.routes);
app.use(user.routes);
app.use(product.routes);
app.use(address.routes);

app.use((req, res, next) => {
  const err = new Error('Path Not Found');
  err.code = 404;
  next(err);
});

app.use(core.middleware.apiErrorResponse());

export default app;
