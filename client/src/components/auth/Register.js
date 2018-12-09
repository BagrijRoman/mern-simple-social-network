import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

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

  componentDidMount() {
    const { auth: { isAuthenticated }, history } = this.props;

    if (isAuthenticated) {
      history.push('/dashboard');
    }
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
                <TextFieldGroup {...{
                  name: 'name',
                  type: 'text',
                  value: name,
                  placeholder: 'Name',
                  error: errors.name,
                  onChange,
                }}/>

                <TextFieldGroup {...{
                  name: 'email',
                  type: 'email',
                  value: email,
                  placeholder: 'Email Address',
                  error: errors.email,
                  onChange,
                  info: 'This site uses Gravatar so if you want a profile image, use a Gravatar email',
                }}/>

                <TextFieldGroup {...{
                  name: 'password',
                  type: 'password',
                  value: password,
                  placeholder: 'Password',
                  error: errors.password,
                  onChange,
                }}/>

                <TextFieldGroup {...{
                  name: 'password2',
                  type: 'password',
                  value: password2,
                  placeholder: 'Confirm Password',
                  error: errors.password2,
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
