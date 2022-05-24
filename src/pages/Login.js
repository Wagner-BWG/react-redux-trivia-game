import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import '../App.css';
import { fetchPlayerToken } from '../redux/actions';
import { addUser } from '../redux/services/localStorage';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      playerName: '',
      playerEmail: '',
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

  handleSubmitClick = async () => {
    const { setTokenToUser, history } = this.props;
    const { playerEmail, playerName } = this.state;
    const playerInfo = {
      playerEmail,
      playerName,
    };
    await setTokenToUser(playerInfo);
    const { playerTokenInfo } = this.props;
    // console.log(playerTokenInfo);
    addUser(playerTokenInfo);
    history.push('/game');
  }

  validadeInputs = () => {
    const { playerName, playerEmail } = this.state;
    const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isplayerEmailValid = validateEmailInputRegex.test(playerEmail);
    if (isplayerEmailValid === true && playerName.length > 1) {
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
        <label htmlFor="playerName">
          <input
            type="text"
            placeholder="Insira seu nome"
            data-testid="input-player-name"
            name="playerName"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="playerEmail">
          <input
            type="email"
            placeholder="Insira seu email"
            data-testid="input-gravatar-email"
            name="playerEmail"
            onChange={ this.handleChange }
          />
        </label>
        {/* aqui eu tive que mudar pra onClick,
        porque eu acho que submit é mais pra form. Só funcionou com onClick */}
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.handleSubmitClick }
        >
          Play
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTokenToUser: (state) => dispatch(fetchPlayerToken(state)),
});

const mapStateToProps = (state) => ({
  playerTokenInfo: state.playerToken.token,
});

Login.propTypes = {
  // playerInfo: PropTypes.shape({
  //   response_code: PropTypes.number,
  //   response_message: PropTypes.string,
  //   token: PropTypes.string,
  // }).isRequired,
  playerTokenInfo: PropTypes.string.isRequired,
  setTokenToUser: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
