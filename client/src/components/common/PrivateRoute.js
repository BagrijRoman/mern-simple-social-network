import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) =>
  <Switch>
    <Route
      {...rest}
      render={props => auth.isAuthenticated ?
        <Component {...props}/> :
        <Redirect to='/login' />
      }
    />
  </Switch>;

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(PrivateRoute);

