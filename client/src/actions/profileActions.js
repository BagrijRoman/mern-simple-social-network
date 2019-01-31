import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
} from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('http://localhost:5000/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {},
    }));
};

export const createProfile = (profileData, history) => dispatch => {
  axios.post('http://localhost:5000/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const setProfileLoading = () => ({ type: PROFILE_LOADING });

export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

export const addExperience = (expData, history) => dispatch => {
  axios.post('http://localhost:5000/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const addEducation = (eduData, history) => dispatch => {
  axios.post('http://localhost:5000/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const deleteAccount = () => dispatch => {
  axios.delete('http://localhost:5000/api/profile')
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const deleteExperience = (id, history) => dispatch => {
  axios
    .delete(`http://localhost:5000/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    );
};