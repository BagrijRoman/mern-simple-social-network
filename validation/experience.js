const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateExperienceInput = (data) => {
  let errors = {};

  const title = !isEmpty(data.title) ? data.title : '';
  const company = !isEmpty(data.company) ? data.company : '';
  const from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};
