const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateEducationInput = (data) => {
  let errors = {};

  const school = !isEmpty(data.school) ? data.school : '';
  const degree = !isEmpty(data.degree) ? data.degree : '';
  const fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  const from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(school)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of study field is required';
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};
