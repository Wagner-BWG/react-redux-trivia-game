import { combineReducers } from 'redux';
import playerReducer from './player';
import gameReducer from './game';

const rootReducer = combineReducers({
  player: playerReducer,
  questions: gameReducer,
});

export default rootReducer;
