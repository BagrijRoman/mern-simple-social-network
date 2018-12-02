const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  const email = !isEmpty(data.email) ? data.email : '';
  const password = !isEmpty(data.password) ? data.password : '';


  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};
