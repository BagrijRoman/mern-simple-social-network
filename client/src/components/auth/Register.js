import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentWillReceiveProps({ errors }) {
    if (errors) {
      this.setState({ errors });
    }
  }

  onChange = ({ target: { name, value }}) => this.setState({ [name]: value });

  onSubmit = (e) => {
    e.preventDefault();
    const { registerUser, history } = this.props;
    const { name, email, password, password2 } = this.state;

    registerUser({ name, email, password, password2 }, history);
  };

  render() {
    const { onSubmit, onChange, state, props } = this;
    const { user } = props.auth;
    const {
      errors,
      name,
      email,
      password,
      password2,
    } = state;

    return (
      <div className="register">
        { user ? user.name : null }
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.name })}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.password2 })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
