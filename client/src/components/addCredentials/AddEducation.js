import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addEducation } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextFieldGroup';


class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
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
    const { history, addEducation } = this.props;
    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
      disabled,
    } = this.state;

    addEducation({
        school,
        degree,
        fieldOfStudy,
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
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      disabled,
      current,
      description,
    } = state;

    console.log(errors);


    return <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="diasplay-4 text-center">Add Education</h1>
            <p className="lead text-center">Add any any school, bootcamp, etc...</p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup {...{
                placeholder: '* School',
                name: 'school',
                value: school,
                onChange,
                error: errors.school,
              }}/>
              <TextFieldGroup {...{
                placeholder: '* Degree',
                name: 'degree',
                value: degree,
                onChange,
                error: errors.degree,
              }}/>
              <TextFieldGroup {...{
                placeholder: 'Field of study',
                name: 'fieldOfStudy',
                value: fieldOfStudy,
                onChange,
                error: errors.fieldOfStudy,
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
                <label htmlFor="current" className="form-check-label">Current education</label>
              </div>
              <TextAreaFieldGroup {...{
                placeholder: 'Tell us about program you were in.',
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors,
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
