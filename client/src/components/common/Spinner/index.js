import React from 'react';
import spinner from './spinner.gif';

const spinnerStyles = {
  width: '200px',
  margin: 'auto',
  display: 'block',
};

export default () => <div>
  <img
    src={spinner}
    alt="Loading..."
    style={spinnerStyles}
  />
</div>;

