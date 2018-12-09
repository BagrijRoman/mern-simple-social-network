import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
}) =>
  <div className="form-group">
    <input {...{
      type,
      placeholder,
      name,
      onChange,
      value,
      disabled,
      className: classnames('form-control form-control-lg', { 'is-invalid': error })
    }}/>
    {info ? <small className="form-text text-muted">{info}</small> : null}
    {error ? <div className="invalid-feedback">{error}</div> : null}
  </div>;

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
