import product from '../src/modules/product';

const { Product } = product.model;

module.exports = {
  up: queryInterface => queryInterface.createTable(Product.tableName, Product.attributes),
  down: queryInterface => queryInterface.dropTable(Product.tableName),
};
