export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_GAME = 'SET_GAME';

export const setUserToken = (payload) => ({
  type: SET_USER_TOKEN,
  payload,
});

const setGame = (payload) => ({
  type: SET_GAME,
  payload,
});

export const fetchPlayerToken = (state) => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    // console.log(data);
    // dispatch(setUserToken({ ...state, ...data }));
    dispatch(setUserToken({ ...state, playerToken: data }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchQuestions = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    console.log(data);
    if (data.response_code === 0) {
      dispatch(setGame(data.results));
    } else console.log('TOKEN INVÁLIDO');
  } catch (error) {
    console.log(error);
  }
};
