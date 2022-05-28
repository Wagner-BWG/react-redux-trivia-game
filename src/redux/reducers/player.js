// seguindo o readme eu tive que trocar o nome do arquivo de user pra player. ai também troquei o nome das variáveis na tela de login
import { SET_USER_TOKEN, SET_SCORE, SEND_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  playerName: '',
  playerEmail: '',
  imageURL: '',
  score: 0,
  assertions: 0,
  playerToken: {
    response_code: 3,
    response_message: 'Deu ruim',
    token: '',
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_TOKEN:
    return { ...state,
      playerToken: action.payload.playerToken,
      playerName: action.payload.playerName,
      playerEmail: action.payload.playerEmail };
  case SEND_ASSERTIONS:
    return { ...state,
      assertions: action.payload };
  case SET_SCORE:
    return { ...state, 
      score: action.payload };
  default:
    return state;
  }
};

export default playerReducer;
