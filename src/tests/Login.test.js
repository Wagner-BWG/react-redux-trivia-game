import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const NAME_SAMPLE = 'Chuck Norris';
const VALID_EMAIL = 'chuck@norris.com';
const INVALID_EMAIL_0 = 'chuck';
const INVALID_EMAIL_1 = 'chuck@com@';
const INVALID_EMAIL_2 = 'chuckcom@';
const INVALID_EMAIL_3 = 'chuck@norris.';

describe('4.1. Testa a tela de login e seus inputs', () => {
  it('Player deve conseguir escrever seu nome no input de texto', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, NAME_SAMPLE);
    expect(nameInput).toHaveValue(NAME_SAMPLE);
  });

  it('O campo de texto para o nome deve possuir o data-testid correto', () => {
    // data-testid="input-player-name"
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('data-testid', 'input-player-name');
  });

  it('Player deve conseguir escrever seu email no input de email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, VALID_EMAIL);
    expect(emailInput).toHaveValue(VALID_EMAIL);
  });

  it('O campo de texto para o email deve possuir o data-testid correto', () => {
    // data-testid="input-gravatar-email"
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('data-testid', 'input-gravatar-email');
  });

  it('O botão "Play" que leva ao jogo deve possuir o data-testid correto', () => {
    // data-testid="btn-play"
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('data-testid', 'btn-play');
  });

  it('Botão "Play" está desabilitado quando Player não preencher nenhum campo', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe('');

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe('');

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('disabled');
  });

  it('Botão "Play" está desabilitado quando Player escrever apenas o nome', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe('');
    userEvent.type(nameInput, NAME_SAMPLE);
    expect(nameInput).toHaveValue(NAME_SAMPLE);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe('');

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('disabled');
  });

  it('Botão "Play" está desabilitado quando Player escrever apenas o email', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe('');

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe('');
    userEvent.type(emailInput, VALID_EMAIL);
    expect(emailInput).toHaveValue(VALID_EMAIL);

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('disabled');
  });

  it('Botão "Play" está habilitado quando Player preencher ambos os campos', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe('');

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe('');

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('disabled');

    userEvent.type(nameInput, NAME_SAMPLE);
    expect(nameInput).toHaveValue(NAME_SAMPLE);
    userEvent.type(emailInput, VALID_EMAIL);
    expect(emailInput).toHaveValue(VALID_EMAIL);

    expect(playButton).toBeEnabled();
  });

  it('Botão "Play" permanece desabilitado se inserido email inválido', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(nameInput, NAME_SAMPLE);
    userEvent.type(emailInput, INVALID_EMAIL_0);
    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, NAME_SAMPLE);
    userEvent.type(emailInput, INVALID_EMAIL_1);
    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, NAME_SAMPLE);
    userEvent.type(emailInput, INVALID_EMAIL_2);
    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, NAME_SAMPLE);
    userEvent.type(emailInput, INVALID_EMAIL_3);
    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, NAME_SAMPLE);
    userEvent.type(emailInput, VALID_EMAIL);
    expect(playButton).toBeEnabled();
  });
});

// screen.logTestingPlaygroundURL();
