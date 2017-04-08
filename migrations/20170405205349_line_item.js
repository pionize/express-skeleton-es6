
exports.up = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('line_item'),
  knex.schema.createTableIfNotExists('line_item', (t) => {
    t.increments('line_item_id').primary();
    t.string('name').defaultTo('').notNullable();
    t.enu('entity_type', ['product', 'coupon']).notNullable();
    t.integer('entity_id').unsigned().notNullable().defaultTo(0);
    t.integer('quantity').unsigned().notNullable().defaultTo(0);
    t.integer('amount').notNullable().defaultTo(0);
    t.integer('total_amount').notNullable().defaultTo(0);
    t.integer('order_id').unsigned().references('order.order_id')
      .onDelete('SET NULL')
      .nullable();
    t.timestamps(true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('line_item'),
]);
