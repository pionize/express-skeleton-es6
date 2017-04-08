const constraints = {};

/**
 * Create payment confirmation
 */
constraints.paymentConfirmation = {
  account_name: {
    presence: true,
  },
  account_bank: {
    presence: true,
  },
  account_number: {
    presence: true,
  },
  merchant_number: {
    presence: true,
  },
  merchant_bank: {
    presence: true,
  },
  amount: {
    presence: true,
  },
  proof: {
    presence: true,
  },
};

/**
 * Verify payment
 */
constraints.paymentVerify = {
  order_number: {
    presence: true,
  },
  payment_confirmation_id: {
    presence: true,
  },
};

export default constraints;
