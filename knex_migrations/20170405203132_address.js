
exports.up = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('address'),
  knex.schema.createTableIfNotExists('address', (t) => {
    t.increments('address_id').primary();
    t.string('name').defaultTo('').notNullable();
    t.string('email').defaultTo('').notNullable();
    t.string('address').defaultTo('').notNullable();
    t.string('phone').defaultTo('').notNullable();
    t.integer('user_id').unsigned().references('user.user_id')
      .onDelete('SET NULL')
      .nullable();
    t.timestamps(true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('address'),
]);
