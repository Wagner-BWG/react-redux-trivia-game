import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      userName: '',
      userEmail: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validadeInputs();
    });
  }

  validadeInputs = () => {
    const { userName, userEmail } = this.state;
    const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isUserEmailValid = validateEmailInputRegex.test(userEmail);
    if (isUserEmailValid === true && userName.length > 1) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="App">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <h1>Login</h1>
        <label htmlFor="userName">
          <input
            type="text"
            placeholder="Insira seu nome"
            data-testid="input-player-name"
            name="userName"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userEmail">
          <input
            type="email"
            placeholder="Insira seu email"
            data-testid="input-gravatar-email"
            name="userEmail"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ disabled }
          onSubmit={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
