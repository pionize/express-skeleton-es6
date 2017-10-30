
exports.up = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('product'),
  knex.schema.createTableIfNotExists('product', (t) => {
    t.increments('product_id').primary();
    t.string('name').defaultTo('').notNullable();
    t.enu('status', ['active', 'inactive']).defaultTo('active').notNullable();
    t.integer('quantity').unsigned().notNullable().defaultTo(0);
    t.integer('price').unsigned().notNullable().defaultTo(0);
    t.string('image').defaultTo('').notNullable();
    t.text('description').defaultTo('').notNullable();
    t.timestamps(true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('product'),
]);
