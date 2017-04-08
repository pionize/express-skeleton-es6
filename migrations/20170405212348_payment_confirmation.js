
exports.up = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('payment_confirmation'),
  knex.schema.createTableIfNotExists('payment_confirmation', (t) => {
    t.increments('payment_confirmation_id').primary();
    t.string('order_number').defaultTo('').notNullable();
    t.string('account_name').defaultTo('').notNullable();
    t.string('account_bank').defaultTo('').notNullable();
    t.string('account_number').defaultTo('').notNullable();
    t.string('merchant_number').defaultTo('').notNullable();
    t.string('merchant_bank').defaultTo('').notNullable();
    t.integer('amount').unsigned().defaultTo(0).notNullable();
    t.string('proof').defaultTo('').notNullable();
    t.timestamps(true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('payment_confirmation'),
]);
