export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_GAME = 'SET_GAME';
export const SET_TIMER = 'SET_TIMER';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SEND_ASSERTIONS = 'SEND_ASSETIONS';
export const SET_COUNTDOWN = 'SET_COUNTDOWN';

export const setUserToken = (payload) => ({
  type: SET_USER_TOKEN,
  payload,
});

const setGame = (payload) => ({
  type: SET_GAME,
  payload,
});

export const setTimer = (payload) => ({
  type: SET_TIMER,
  payload,
});

export const setCountdown = (payload) => ({
  type: SET_COUNTDOWN,
  payload,
});

export const nextQuestion = (payload) => ({
  type: NEXT_QUESTION,
  payload,
});

export const setSendAssertionsToFeedbackPage = (payload) => ({
  type: SEND_ASSERTIONS,
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
    // const response = await fetch(`https://opentdb.com/api.php?amount=5&token=INVALID_TOKEN`);
    const data = await response.json();
    dispatch(setGame(data));
    // if (data.response_code === 0) {
    //   dispatch(setGame(data));
    // }
  } catch (error) {
    console.log(error);
  }
};
