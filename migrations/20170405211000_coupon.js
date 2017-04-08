
exports.up = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('coupon'),
  knex.schema.createTableIfNotExists('coupon', (t) => {
    t.increments('coupon_id').primary();
    t.string('name').defaultTo('').notNullable();
    t.string('code').defaultTo('').notNullable();
    t.string('type').defaultTo('').notNullable();
    t.integer('value').unsigned().defaultTo(0).notNullable();
    t.integer('quantity').unsigned().defaultTo(0).notNullable();
    t.enu('status', ['active', 'inactive']).defaultTo('active').notNullable();
    t.timestamp('start_date').notNullable().defaultTo(knex.fn.now());
    t.timestamp('end_date').notNullable().defaultTo(knex.fn.now());
    t.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('coupon'),
]);
