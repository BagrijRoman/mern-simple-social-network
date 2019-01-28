import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileActions from './ProfileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = () => this.props.deleteAccount();

  render() {
    const {
      auth: { user: { name } },
      profile: {
        profile,
        loading,
      },
    } = this.props;

    let dashboardContent;

    // todo  refactor this
    if(profile === null || loading) {
      dashboardContent = <Spinner/>;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`} >{ name }</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: '60px' }} >
              <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { name }</p>
            <p>You have not yes setup profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create profile</Link>
          </div>
        );
      }
    }

    return(
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="dispaly-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );

  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, auth }) => ({ profile, auth });

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
