import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import '../App.css';
import { fetchPlayerToken } from '../redux/actions';
import { addUser } from '../redux/services/localStorage';
import Settings from '../components/Settings';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      showSettings: false,
      playerName: '',
      playerEmail: '',
      currentClass: 'button-deactivated',
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
        currentClass: 'button',
      });
    } else {
      this.setState({
        disabled: true,
        currentClass: 'button-deactivated',
      });
    }
  }

  settingsWindow = () => {
    const { showSettings } = this.state;
    this.setState({ showSettings: !showSettings });
  }

  render() {
    const { disabled, showSettings, currentClass } = this.state;
    return (
      <div className="App">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <h1>Login</h1>
        <div className="input-div">
          <label htmlFor="playerName" className="label">
            {'Nome: '}
            <input
              type="text"
              placeholder="Insira seu nome"
              data-testid="input-player-name"
              name="playerName"
              id="playerName"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="playerEmail" className="label">
            {'Email: '}
            <input
              type="email"
              placeholder="Insira seu email"
              data-testid="input-gravatar-email"
              name="playerEmail"
              id="playerEmail"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <p />
        <div className="btn-div">
          <button
            className={ currentClass }
            type="submit"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleSubmitClick }
          >
            Play
          </button>
          <button
            className="button"
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsWindow }
          >
            Configurações
          </button>
        </div>
        {showSettings ? <Settings /> : <p />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTokenToUser: (state) => dispatch(fetchPlayerToken(state)),
});

const mapStateToProps = (state) => ({
  playerTokenInfo: state.player.playerToken.token,
});

Login.defaultProps = {
  playerTokenInfo: '',
  push: () => {},
  history: {},
};

Login.propTypes = {
  // playerInfo: PropTypes.shape({
  //   response_code: PropTypes.number,
  //   response_message: PropTypes.string,
  //   token: PropTypes.string,
  // }).isRequired,
  playerTokenInfo: PropTypes.string,
  setTokenToUser: PropTypes.func.isRequired,
  history: PropTypes.shape(),
  push: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
