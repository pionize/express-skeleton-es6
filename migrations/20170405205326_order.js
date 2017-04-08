
exports.up = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('order'),
  knex.schema.createTableIfNotExists('order', (t) => {
    t.increments('order_id').primary();
    t.string('order_number').defaultTo('').notNullable();
    t.enu('status', ['cart', 'canceled', 'checkout-complete', 'pending-shipment', 'shipped', 'complete']).defaultTo('cart').notNullable();
    t.string('shipping_receipt').nullable();
    t.integer('user_id').unsigned().references('user.user_id')
      .onDelete('SET NULL')
      .nullable();
    t.integer('address_id').unsigned().references('address.address_id')
      .onDelete('SET NULL')
      .nullable();
    t.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('order'),
]);
