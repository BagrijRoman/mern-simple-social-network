import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

const avatarStyles = {
  width: '25px',
  marginRight: '5px',
};

const logoutContainerStyles = {
  cursor: 'pointer',
};

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    const { clearCurrentProfile, logoutUser  } = this.props;
    logoutUser();
    clearCurrentProfile();
  };

  getAuthLinks = () => {
    const { user: { avatar, name } } = this.props.auth;

    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <span href='' onClick={this.onLogoutClick} style={logoutContainerStyles} className="nav-link">
            <img
              src={avatar}
              alt={name}
              title="You must have a gravatar connected to email to display an image"
              style={avatarStyles}
              className="rounded-circle"
            />
            {'  '}
            Logout
          </span>
        </li>
      </ul>
    );
  };

  getGuestLinks = () => <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/register">
        Sign Up
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        Login
      </Link>
    </li>
  </ul>;

  render() {
    const { props, getAuthLinks, getGuestLinks } = this;
    const { isAuthenticated } = props.auth;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>
            { isAuthenticated ? getAuthLinks() : getGuestLinks() }
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
