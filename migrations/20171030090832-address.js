import address from '../src/modules/address';

const { Address } = address.model;

module.exports = {
  up: queryInterface => queryInterface.createTable(Address.tableName, Address.attributes),
  down: queryInterface => queryInterface.dropTable(Address.tableName),
};
