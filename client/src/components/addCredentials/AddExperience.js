import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addExperience } from '../../actions/profileActions';
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

  onSubmit = (e) => {
    e.preventDefault();
    const { history, addExperience } = this.props;
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
      disabled,
    } = this.state;

    addExperience({
        company,
        title,
        location,
        from,
        to: disabled ? '' : to,
        current,
        description,
      },
      history);
  };

  onCheck = () => this.setState({
    disabled: !this.state.disabled,
    current: !this.state.current,
  });

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const {
      state,
      onSubmit,
      onChange,
      onCheck,
      props: { errors }
    } = this;
    const {
      company,
      title,
      location,
      from,
      to,
      disabled,
      current,
      description,
    } = state;

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
            <form onSubmit={onSubmit}>
              <TextFieldGroup {...{
                placeholder: '* Company',
                name: 'company',
                value: company,
                onChange,
                error: errors.company,
              }}/>
              <TextFieldGroup {...{
                placeholder: '* Job Title',
                name: 'title',
                value: title,
                onChange,
                error: errors.title,
              }}/>
              <TextFieldGroup {...{
                placeholder: 'Location',
                name: 'location',
                value: location,
                onChange,
                error: errors.location,
              }}/>
              <h6>From date</h6>
              <TextFieldGroup {...{
                name: 'from',
                type: 'date',
                value: from,
                onChange,
                error: errors.from,
              }}/>
              <h6>To date</h6>
              <TextFieldGroup {...{
                name: 'to',
                type: 'date',
                value: disabled ? '' : to,
                onChange,
                disabled,
              }}/>
              <div className="form-check mb-4">
                <input
                  {...{
                    type: 'checkbox',
                    className: 'form-check-input',
                    name: 'current',
                    value: current,
                    checked: current,
                    onChange: onCheck,
                    id: 'current',
                  }}
                />
                <label htmlFor="current" className="form-check-label">Current Job</label>
              </div>
              <TextAreaFieldGroup {...{
                placeholder: 'Job Description',
                name: 'description',
                value: description,
                onChange,
              }}/>
              <input {...{
                type: 'submit',
                value: 'Submit',
                className: 'btn btn-info btn-block mt-4',
              }}/>
            </form>
          </div>
        </div>
      </div>
    </div>;
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors,
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
