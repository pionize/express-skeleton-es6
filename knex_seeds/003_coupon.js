
exports.seed = (knex, Promise) => Promise.join(
  // Deletes ALL existing entries
  knex('coupon').del(),
  // Inserts seed entries
  knex('coupon').insert([
    { coupon_id: 1, name: 'discount 50k fixed', code: 'fix50', type: 'fixed', value: '50000', quantity: 5, status: 'active', start_date: '2017-04-05 00:00', end_date: '2017-04-10 00:00' },
    { coupon_id: 2, name: 'discount 10%', code: 'percent10', type: 'percentage', value: '10', quantity: 3, status: 'active', start_date: '2017-04-03 00:00', end_date: '2017-04-20 00:00' },
    { coupon_id: 3, name: 'discount 100k fixed', code: 'fix100', type: 'fixed', value: '50000', quantity: 4, status: 'active', start_date: '2017-04-01 00:00', end_date: '2017-04-04 00:00' },
    { coupon_id: 4, name: 'discount 20%', code: 'percent20', type: 'percentage', value: '20', quantity: 1, status: 'inactive', start_date: '2017-04-03 00:00', end_date: '2017-04-05 00:00' },
  ]),
);

