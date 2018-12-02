const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePostInput = (data) => {
  let errors = {};

  const text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(text, { min: 10, max: 300 })) {
    errors.text = 'Text must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};
