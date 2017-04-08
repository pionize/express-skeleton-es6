
exports.up = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('order_log'),
  knex.schema.createTableIfNotExists('order_log', (t) => {
    t.increments('order_log_id').primary();
    t.string('log').defaultTo('').notNullable();
    t.integer('order_id').unsigned().references('order.order_id')
      .onDelete('SET NULL')
      .nullable();
    t.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('order_log'),
]);
