import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
      };

    default:
      return { ...state };
  }
}
