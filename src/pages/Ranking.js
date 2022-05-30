import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor() {
    super();
    this.state = { ranking: [] };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    const rankedList = ranking.map((player, index) => {
      const hashUserEmail = md5(player.playerEmailInfo).toString();
      return (
        <tr key={ index }>
          <td>{ `#${index + 1}` }</td>
          <td>
            <img
              src={ `https://www.gravatar.com/avatar/${hashUserEmail}` }
              alt="player avatar"
              data-testid="header-profile-picture"
            />
          </td>
          <td data-testid={ `player-name-${index}` }>{player.playerNameInfo}</td>
          <td data-testid={ `player-score-${index}` }>{player.score}</td>
        </tr>
      );
    });
    this.setState({ ranking: rankedList });
  }

  redirectToHomePage = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.redirectToHomePage }
          data-testid="btn-go-home"
        >
          Back to home
        </button>
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Avatar</th>
              <th>Player</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking}
          </tbody>
        </table>
      </div>
    );
  }
}

Ranking.defaultProps = {
  push: () => {},
  history: {},
};

Ranking.propTypes = {
  history: PropTypes.shape(),
  push: PropTypes.func,
};

export default Ranking;
