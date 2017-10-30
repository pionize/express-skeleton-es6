const path = require('path');
const cfg = require('../common/config');

const def = {};

// setup default env
def.env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = def.env;

def.debug = true;
def.https = false;
def.host = 'localhost';
def.port = 4000;

// sequelize config
def.sequelize = {};
def.sequelize.debug = true;
def.sequelize.username = 'root';
def.sequelize.password = '';
def.sequelize.database = '';
def.sequelize.host = '127.0.0.1';
def.sequelize.port = 3306;
def.sequelize.dialect = 'mysql';


// paths
const rootDir = path.dirname(__dirname);
def.publicPath = path.join(rootDir, 'public');
def.cachePath = path.join(rootDir, 'cache');
def.tempPath = path.join(rootDir, 'temp');
def.logPath = path.join(rootDir, 'logs/log');
def.imagePath = path.join(rootDir, 'public/image');
def.logPath = path.join(rootDir, 'logs/log');

def.cdnPath = 'http://cdn.localhost.com';

// knexjs config
def.knex = {};
def.knex.client = 'mysql';
def.knex.connection = {};
def.knex.connection.host = '127.0.0.1';
def.knex.connection.user = 'root';
def.knex.connection.password = '';
def.knex.connection.database = 'project';
def.knex.connection.charset = 'utf8';

// jwt config
def.jwt = {};
def.jwt.secretOrKey = 'MY-APP';
def.jwt.issuer = 'pionize.com';
def.jwt.audience = 'pionize.com';

// mailer config
def.emailServiceAdapter = 'sendgrid';

// url builder
def.url = (dir = '/') => {
  const port = ((def.https && def.port !== 443) || (!def.https && def.port !== 80)) ? `:${def.port}` : '';
  return `http${def.https ? 's' : ''}://${def.host}${port}${dir}`;
};

cfg.resolveLocalConfig(__dirname, (err, file) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  if (!err) cfg.merge(def, require(file));
});

module.exports = def;
