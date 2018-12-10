import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
}) =>
  <div className="form-group">
    <textarea {...{
      placeholder,
      name,
      onChange,
      value,
      className: classnames('form-control form-control-lg', { 'is-invalid': error })
    }}/>
    {info ? <small className="form-text text-muted">{info}</small> : null}
    {error ? <div className="invalid-feedback">{error}</div> : null}
  </div>;

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
};

export default TextAreaFieldGroup;
