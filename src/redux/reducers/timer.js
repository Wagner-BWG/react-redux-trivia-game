import { SET_TIMER } from '../actions';

const INITIAL_STATE = {};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIMER:
    return { ...state,
      disabled: action.payload,
    };

  default:
    return state;
  }
};

export default timerReducer;
