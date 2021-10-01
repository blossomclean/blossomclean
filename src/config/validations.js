export const ENQUIRY = {
  firstName: {
    isRequired: {
      value: true,
      message: 'First Name is required',
    },
    isAlpha: {
      message: "You're not allowed to enter special characters and numbers",
    },
    maxLength: {
      value: 25,
      message: 'First Name max length is 25',
    },
  },
  lastName: {
    isRequired: {
      value: true,
      message: 'Last Name is required',
    },
    isAlpha: {
      message: "You're not allowed to enter special characters and numbers",
    },
    maxLength: {
      value: 25,
      message: 'Last Name max length is 25',
    },
  },
  email: {
    isRequired: {
      value: true,
      message: 'Email is required',
    },
    isEmail: {
      message: 'Email address is invalid',
    },
    maxLength: {
      value: 50,
      message: 'Email max length is 50',
    },
  },
  phone: {
    isRequired: {
      value: true,
      message: 'Phone number is required',
    },
    isPhone: {
      message: 'Phone number is invalid',
    },
    maxLength: {
      value: 15,
      message: 'Phone max length is 15',
    },
  },
  enquiry: {
    maxLength: {
      value: 250,
      message: 'Enquiry max length is 250',
    },
  },
  address: {
    isRequired: {
      value: true,
      message: 'Address is required',
    },
  },
  address: {
    isRequired: {
      value: true,
      message: 'Address is required',
    },
  },
};

export const JOIN_US = {
  ...ENQUIRY,
  resume: {
    isRequired: {
      value: true,
      message: 'Resume is required',
    },
  },
  police: {
    isRequired: {
      value: true,
      message: 'Police Check is required',
    },
  },
  identityProof: {
    isRequired: {
      value: true,
      message: 'Identity Proof is required',
    },
  },
};
