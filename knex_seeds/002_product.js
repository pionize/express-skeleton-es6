
exports.seed = (knex, Promise) => Promise.join(
  // Deletes ALL existing entries
  knex('product').del(),
  // Inserts seed entries
  knex('product').insert([
    { product_id: 1, name: 'Apple iPhone 7', status: 'active', quantity: 10, price: 12000000, image: 'http://cdn2.gsmarena.com/vv/pics/apple/apple-iphone-7-3.jpg', description: '' },
    { product_id: 2, name: 'Samsung Galaxy S8', status: 'active', quantity: 0, price: 11000000, image: 'https://img.us.news.samsung.com/us/wp-content/uploads/2017/03/29150006/S8Plus_S8_Silver_LockUp_rgb.jpg', description: '' },
    { product_id: 3, name: 'MacBook Pro 2016', status: 'active', quantity: 2, price: 16000000, image: 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/bp/mbp13touch/silver/mbp13touch-silver-select-201610', description: '' },
    { product_id: 4, name: 'MacBook Air 2016', status: 'inactive', quantity: 3, price: 15000000, image: 'https://cdn2.macworld.co.uk/cmsdata/features/3605337/MacBook_Air_2015_13inch_800home.jpg', description: '' },
    { product_id: 5, name: 'Sony Experia Z5', status: 'inactive', quantity: 2, price: 9000000, image: 'http://drop.ndtv.com/TECH/product_database/images/92201585041PM_635_xperia_z5.jpeg', description: '' },
  ]),
);
