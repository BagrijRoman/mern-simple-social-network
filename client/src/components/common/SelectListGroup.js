import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
}) =>
  <div className="form-group">
    <select {...{
      name,
      onChange,
      value,
      className: classnames('form-control form-control-lg', { 'is-invalid': error })
    }}>
      {options.map(({ label, value }) =>
        <option key={label} value={value}>{label}</option>
      )}
    </select>
    {info ? <small className="form-text text-muted">{info}</small> : null}
    {error ? <div className="invalid-feedback">{error}</div> : null}
  </div>;

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
