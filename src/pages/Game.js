import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quizz from '../components/Quiz';

class Game extends Component {
  componentDidMount() {
    const { playerToken, history } = this.props;
    const { response_code: responseCode } = playerToken;
    console.log(responseCode);
    const MAGIC_NUMBER = 3;
    if (responseCode === MAGIC_NUMBER) {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        Game
        <Quizz />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.player.playerToken,
});

Game.propTypes = {
  playerToken: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape(),
  push: PropTypes.func,
};

Game.defaultProps = {
  push: () => {},
  history: {},
};

export default connect(mapStateToProps)(Game);
