import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
}) =>
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={icon} />
      </span>
    </div>
    <input {...{
      placeholder,
      name,
      onChange,
      value,
      className: classnames('form-control form-control-lg', { 'is-invalid': error })
    }}/>
    {error ? <div className="invalid-feedback">{error}</div> : null}
  </div>;

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
};

InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;
