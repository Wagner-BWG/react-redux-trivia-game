import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
// import { renderWithRouterAndStore } from './helpers/TestConfigs';
// import { waitFor } from '@testing-library/react';
// import { MOCK_TOKEN } from './helpers/constants';
import App from '../App';
// import Login from '../pages/Login';
// import { NAME_SAMPLE, VALID_EMAIL} from './helpers';

// const apiResponse = Promise.resolve({
//   json: () => Promise.resolve(MOCK_TOKEN),
//   ok: true,
// });

// const mockedToken = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);
// global.fetch = jest.fn(() => apiResponse);

const NAME_SAMPLE = 'Chuck Norris';
const VALID_EMAIL = 'chuck@norris.com';

describe('4.2. Testa o botão de iniciar o jogo', () => {
  it('O botão "Play" está na tela?', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
  });

  it('Ao clicar, o botão redireciona ao jogo?', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const playButton = screen.getByRole('button', { name: /play/i });
    expect(history.location.pathname).toBe('/');

    userEvent.type(nameInput, NAME_SAMPLE);
    userEvent.type(emailInput, VALID_EMAIL);
    expect(playButton).toBeEnabled();
    userEvent.click(playButton);

    await waitFor(() => {
      const gameHeader = screen.getByRole('heading', { name: /game/i });
      expect(gameHeader).toBeInTheDocument();
      expect(history.location.pathname).toBe('/game');
    });
  });

  // it('Ao clicar no botão é feita requisição à API?', async () => {
  //   const { store } = renderWithRouterAndStore(<App />);

  //   expect(mockedToken).toBeCalled();
  //   const apiUrl = 'https://opentdb.com/api_token.php?command=request';
  //   expect(mockedToken).toBeCalledWith(apiUrl);

  //   const [first, , ...rest] = Object.keys(MOCK_TOKEN);
  //   const playerToken = [first, ...rest];

  //   await waitFor(() => {
  //     expect(store.getState().player.playerToken).toEqual(playerToken);
  //   });
  // });
});
// screen.logTestingPlaygroundURL();
