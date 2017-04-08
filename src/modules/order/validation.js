const constraints = {};

/**
 * Create order
 */
constraints.createOrder = {
  products: {
    presence: true,
  },
};

/**
 * Apply coupon
 */
constraints.applyCoupon = {
  coupon_code: {
    presence: true,
  },
};

/**
 * Checkout complete validation
 */
constraints.checkout = {
  name: {
    presence: true,
  },
  email: {
    presence: true,
  },
  address: {
    presence: true,
  },
  phone: {
    presence: true,
  },
};

export default constraints;
