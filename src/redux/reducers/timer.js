import { SET_TIMER, SET_COUNTDOWN } from '../actions';

const INITIAL_STATE = {};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIMER:
    return { ...state,
      disabled: action.payload,
    };
  case SET_COUNTDOWN:
    return { ...state,
      countdown: action.payload,
    };
  default:
    return state;
  }
};

export default timerReducer;
