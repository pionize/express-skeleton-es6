import moment from 'moment';
import ch from 'chalk';
import morgan from 'morgan';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../../../config';

/**
 * Request logger middleware
 * @param {Array} env
 * @return {function}
 */
export function requestLoggerMiddleware() {
  const logger = new (winston.Logger)({
    transports: [
      new winston.transports.DailyRotateFile({
        filename: config.logPath,
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        level: 'debug',
        timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss'),
        json: false,
      }),
    ],
  });

  logger.stream = {
    write: (message) => {
      logger.info(message);
    },
  };
  morgan.token('body', req => `\n${JSON.stringify(req.body, null, 2)}`);
  return morgan(`${ch.red(':method')} ${ch.green(':url')} ${ch.yellow(':response-time ms')} :body`, { stream: logger.stream });
}

/**
 * Add some utilities to request object
 * @return {function}
 */
export function requestUtilsMiddleware() {
  return (req, res, next) => {
    req.messages = {
      errors: [],
      warnings: [],
      validation: {},
    };
    next();
  };
}

// eslint-disable-next-line no-unused-vars
export function apiResponse() {
  return (req, res) => {
    const { status, message, data } = req.resData;
    return res.json({
      status,
      message,
      data,
    });
  };
}

