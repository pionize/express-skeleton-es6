const constraints = {};

constraints.upload = {
  images: {
    presence: true,
  },
  type: {
    presence: true,
    inclusion: {
      within: ['activity', 'profile', 'cover', 'group', 'story'],
      message: 'accept only `activity` or `profile` value',
    },
  },
};

export default constraints;
