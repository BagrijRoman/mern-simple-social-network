import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextFieldGroup';


class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false,
    };

  }

  render() {
    const { state } = this;
    const { errors } = state;

    return <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="diasplay-4 text-center">Add experience</h1>
            <p className="lead text-center">Add any job position that you have in the past or current</p>
            <small className="d-block pb-3">* = required fields</small>
          </div>
        </div>
      </div>
    </div>;
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors,
});

export default connect(mapStateToProps)(withRouter(AddExperience));
