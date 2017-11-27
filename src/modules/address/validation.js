const constraints = {};

/**
 * Create
 */
constraints.create = {
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

/**
 * Update
 */
constraints.update = {
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
