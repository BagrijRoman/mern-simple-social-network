import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileActions';

const Experience = ({ experience, deleteExperience }) => (
  <div>
    <h4 className="mb-4">Experience Credentials</h4>
    <table className="table">
      <thead>
      <tr>
        <th>Company</th>
        <th>Title</th>
        <th>Years</th>
        <th />
      </tr>
      </thead>
      <tbody>
      {experience.map(({ _id, company, title, from, to }) => (
        <tr key={_id} >
          <td>{company}</td>
          <td>{title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{from}</Moment>{' - '}
            {to === null ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
          </td>
          <td>
            <button onClick={() => deleteExperience(_id)} className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
);

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
