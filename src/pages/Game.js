import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';
import Timer from '../components/Timer';
import Quizz from './Quizz';

class Game extends Component {
  async componentDidMount() {
    const { dispatch, token } = this.props;
    await dispatch(fetchQuestions(token));
    const { questions, history } = this.props;
    const { response_code: responseCode } = questions;
    // console.log(`O response code é ${responseCode}`);
    const MAGIC_NUMBER = 3;
    if (responseCode === MAGIC_NUMBER) {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Game</h1>
        <Timer />
        <div>
          <p>Quizz</p>
          <Quizz />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.player.playerToken,
  token: state.player.playerToken.token,
  questions: state.questions,
});

Game.propTypes = {
  // playerToken: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape(),
  push: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(PropTypes.any),
};

Game.defaultProps = {
  push: () => {},
  history: {},
  questions: [],
};

export default connect(mapStateToProps)(Game);
