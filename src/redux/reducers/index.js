import { combineReducers } from 'redux';
import playerReducer from './player';
import gameReducer from './game';
import timerReducer from './timer';

const rootReducer = combineReducers({
  player: playerReducer,
  questions: gameReducer,
  timer: timerReducer,
});

export default rootReducer;
