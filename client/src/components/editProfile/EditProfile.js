import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { equals } from 'ramda';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { statusSelectOptions } from '../createProfile/const';
import { getCurrentProfile, createProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUserName: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  };

  componentWillReceiveProps(nextProps) {
    const {
      errors,
      profile: { profile }
    } = nextProps;
    this.setState({ errors });

    if (!equals(this.props.profile, profile)) {
      const {
        handle,
        status,
        company,
        website,
        location,
        githubUserName,
        bio,
        social = {},
        skills,
      } = profile || {} ;

      this.setState({
        handle,
        company: !isEmpty(company) ? company : '',
        website: !isEmpty(website) ? website : '',
        location: !isEmpty(location) ? location : '',
        status,
        skills: skills ? skills.join(',') : '',
        githubUserName: !isEmpty(githubUserName) ? githubUserName : '',
        bio: !isEmpty(bio) ? bio : '',
        twitter: !isEmpty(social.twitter) ? social.twitter : '',
        facebook: !isEmpty(social.facebook) ? social.facebook : '',
        linkedin: !isEmpty(social.linkedin) ? social.linkedin : '',
        youtube: !isEmpty(social.youtube) ? social.youtube : '',
        instagram: !isEmpty(social.instagram) ? social.instagram : '',
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { createProfile, history } = this.props;

    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUserName,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    } = this.state;

    const profileData = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUserName,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    };

    createProfile(profileData, history);
  };

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onAddSocialNetworkClick = () =>
    this.setState(({ displaySocialInputs }) => ({ displaySocialInputs: !displaySocialInputs }));

  renderSocialInputs = () => {
    const { state, onChange } = this;
    const {
      errors,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    } = state;

    return (<div>
      <InputGroup {...{
        placeholder: 'Twitter profile URL',
        name: 'twitter',
        icon: 'fab fa-twitter',
        value: twitter,
        onChange,
        error: errors.twitter,
      }}/>
      <InputGroup {...{
        placeholder: 'Facebook profile URL',
        name: 'facebook',
        icon: 'fab fa-facebook',
        value: facebook,
        onChange,
        error: errors.facebook,
      }}/>
      <InputGroup {...{
        placeholder: 'Linkedin profile URL',
        name: 'linkedin',
        icon: 'fab fa-linkedin',
        value: linkedin,
        onChange,
        error: errors.linkedin,
      }}/>
      <InputGroup {...{
        placeholder: 'Youtube profile URL',
        name: 'youtube',
        icon: 'fab fa-youtube',
        value: youtube,
        onChange,
        error: errors.youtube,
      }}/>
      <InputGroup {...{
        placeholder: 'Instagram profile URL',
        name: 'instagram',
        icon: 'fab fa-instagram',
        value: instagram,
        onChange,
        error: errors.instagram,
      }}/>
    </div>);
  };

  render() {
    const {
      onSubmit,
      onChange,
      onAddSocialNetworkClick,
      renderSocialInputs,
      state,
    } = this;
    const {
      handle,
      errors,
      status,
      company,
      website,
      location,
      skills,
      githubUserName,
      bio,
      displaySocialInputs,
    } = state;

    return(
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup {...{
                  placeholder: '* Profile Handle',
                  name: 'handle',
                  value: handle,
                  onChange,
                  error: errors.handle,
                  info: 'A unique handle for your profile URL.',
                }}/>
                <SelectListGroup {...{
                  placeholder: 'Status',
                  name: 'status',
                  value: status,
                  onChange,
                  error: errors.status,
                  options: statusSelectOptions,
                  info: 'Give us an idea of where you are in your career',
                }}/>
                <TextFieldGroup {...{
                  placeholder: 'Company',
                  name: 'company',
                  value: company,
                  onChange,
                  error: errors.company ,
                  info: 'Could be your own company or one you work for',
                }}/>
                <TextFieldGroup {...{
                  placeholder: 'Website',
                  name: 'website',
                  value: website,
                  onChange,
                  error: errors.website ,
                  info: 'Could be your own website or company one',
                }}/>
                <TextFieldGroup {...{
                  placeholder: 'Location',
                  name: 'location',
                  value: location,
                  onChange,
                  error: errors.location ,
                  info: 'City or city and region',
                }}/>
                <TextFieldGroup {...{
                  placeholder: '* Skills',
                  name: 'skills',
                  value: skills,
                  onChange,
                  error: errors.skills ,
                  info: 'Please use comma separated values (like HTML,CSS,JS)',
                }}/>
                <TextFieldGroup {...{
                  placeholder: 'Github Username',
                  name: 'githubUserName',
                  value: githubUserName,
                  onChange,
                  error: errors.githubUserName ,
                  info: 'Username or github repo link',
                }}/>
                <TextAreaFieldGroup {...{
                  placeholder: 'Short Bio',
                  name: 'bio',
                  value: bio,
                  onChange,
                  error: errors.bio ,
                  info: 'Tell us a little about yourself',
                }}/>
                <div className="mb-3">
                  <button className="btn btn-light" type="button" onClick={onAddSocialNetworkClick}>
                    {`${displaySocialInputs ? 'Hide' : 'Display'} Social Network Links`}
                  </button>
                  <span className="text-muted ml-3">Optional</span>
                </div>
                {displaySocialInputs ? renderSocialInputs() : null }
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(EditProfile));
