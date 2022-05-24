// seguindo o readme eu tive que trocar o nome do arquivo de user pra player. ai também troquei o nome das variáveis na tela de login
import { SET_USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  imageURL: '',
  playerToken: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_TOKEN:
    return { ...state, playerToken: action.payload };
  default:
    return state;
  }
};

export default playerReducer;
