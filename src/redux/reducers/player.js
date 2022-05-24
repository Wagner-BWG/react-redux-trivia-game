// seguindo o readme eu tive que trocar o nome do arquivo de user pra player. ai também troquei o nome das variáveis na tela de login
import { SET_USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  playerName: '',
  playerEmail: '',
  imageURL: '',
  playerToken: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_TOKEN:
    return { ...state,
      playerToken: action.payload.playerToken,
      playerName: action.payload.playerName,
      playerEmail: action.payload.playerEmail };
  default:
    return state;
  }
};

export default playerReducer;
