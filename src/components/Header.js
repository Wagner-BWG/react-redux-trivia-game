import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  componentWillUnmount() {
    const { playerNameInfo, playerEmailInfo, score } = this.props;
    const player = { playerNameInfo, playerEmailInfo, score };
    let oldRanking = JSON.parse(localStorage.getItem('ranking'));
    if (oldRanking === null) {
      oldRanking = [];
    }
    const newRanking = [...oldRanking, player];
    console.log(newRanking);
    newRanking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  render() {
    const { playerNameInfo, playerEmailInfo, score } = this.props;
    const hashUserEmail = md5(playerEmailInfo).toString();
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hashUserEmail}` }
            alt="player avatar"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{playerNameInfo}</h2>
          <h2>
            <span>Pontuação total: </span>
            <span data-testid="header-score">{score}</span>
          </h2>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerNameInfo: state.player.playerName,
  playerEmailInfo: state.player.playerEmail,
  playerURLInfo: state.player.imageURL,
  score: state.player.score, // state.questions.assertions,
});

Header.defaultProps = {
  score: 0,
};

Header.propTypes = {
  playerNameInfo: PropTypes.string.isRequired,
  // playerURLInfo: PropTypes.string.isRequired,
  playerEmailInfo: PropTypes.string.isRequired,
  score: PropTypes.number,
};
//
export default connect(mapStateToProps)(Header);
