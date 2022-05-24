export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserToken = (payload) => ({
  type: SET_USER_TOKEN,
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
