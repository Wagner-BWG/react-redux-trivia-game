import { SEND_ASSERTIONS, SET_GAME } from '../actions';

const INITIAL_STATE = {};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_GAME:
    return { ...state, ...action.payload };
  case SEND_ASSERTIONS:
    return { ...state, assertions: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
