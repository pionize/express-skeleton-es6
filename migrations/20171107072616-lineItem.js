import lineItem from '../src/modules/lineItem';

const { LineItem } = lineItem.model;

module.exports = {
  up: queryInterface => queryInterface.createTable(LineItem.tableName, LineItem.attributes),
  down: queryInterface => queryInterface.dropTable(LineItem.tableName),
};
