import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    const { auth: { isAuthenticated }, history } = this.props;

    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }

  componentWillReceiveProps({ errors, auth }) {
    if (auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (errors) {
      this.setState({ errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser({ email, password });
  };

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const { onChange, onSubmit, state } = this;
    const { email, password, errors } = state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={onSubmit}>
                <TextFieldGroup {...{
                  name: 'email',
                  type: 'email',
                  value: email,
                  placeholder: 'Email Address',
                  error: errors.email,
                  onChange,
                }}/>

                <TextFieldGroup {...{
                  name: 'password',
                  type: 'password',
                  value: password,
                  placeholder: 'Password',
                  error: errors.password,
                  onChange,
                }}/>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(mapStateToProps, { loginUser })(Login);
