import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('4.3. Testa o botão de configurações do jogo', () => {
  it('O botão "Configurações" está na tela?', () => {
    renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByRole('button', { name: /config/i });
    expect(settingsButton).toBeInTheDocument();
  });

  it('Ao clicar, o botão redireciona às configurações?', async () => {
    renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByRole('button', { name: /config/i });
    expect(settingsButton).toHaveAttribute('data-testid', 'btn-settings');
    
    userEvent.click(settingsButton);

    const settingsHeading = screen.getByRole('heading', {
      name: /settings/i,
      level: 1,
    });
    expect(settingsHeading).toBeInTheDocument();
    expect(settingsHeading).toHaveAttribute('data-testid', 'settings-title');

  });
});
