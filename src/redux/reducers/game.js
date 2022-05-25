import { SET_GAME } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_GAME:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default gameReducer;
