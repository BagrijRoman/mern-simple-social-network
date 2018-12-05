import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
