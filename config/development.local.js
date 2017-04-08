const def = {};

def.port = 3000;

def.knex = {};
def.knex.client = 'mysql';
def.knex.debug = true;
def.knex.connection = {};
def.knex.connection.host = '127.0.0.1';
def.knex.connection.user = 'root';
def.knex.connection.password = 'root';
def.knex.connection.database = 'ss';
def.knex.connection.charset = 'utf8';

def.cdnPath = 'http://cdn.localhost.com';

module.exports = def;
