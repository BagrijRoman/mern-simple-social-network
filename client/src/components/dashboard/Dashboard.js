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

  onDeleteAccount = () => {
    if (window.confirm('Are you sure? This can not be undone!')) {
      this.props.deleteAccount();
    }
  };

  renderDashboardContent = () => {
    const { props, onDeleteAccount } = this;
    const { profile: { handle, user: { name } } } = props.profile;

    return(
      <div>
        <p className="lead text-muted" >
          Welcome <Link to={`/profile/${handle}`}>{name}</Link>
        </p>
        <ProfileActions />
        <div style={{ marginBottom: '60px' }} />
        <button onClick={onDeleteAccount} className="btn btn-danger">Delete My Account</button>
      </div>
    );
  };

  renderEmptyProfileContent = () =>
    <div>
      <p className="lead text-muted">Welcome { this.props.name }</p>
      <p>You have not yes setup profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-lg btn-info">Create profile</Link>
    </div>;

  render() {
    const { renderEmptyProfileContent, renderDashboardContent, props } = this;
    const { profile: { profile, loading } } = props;


    return(
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="dispaly-4">Dashboard</h1>
              {profile === null || loading ? <Spinner/> :
                Object.keys(profile).length > 0 ? renderDashboardContent() : renderEmptyProfileContent()}
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
