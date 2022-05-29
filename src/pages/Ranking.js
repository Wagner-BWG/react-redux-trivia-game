import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  redirectToHomePage = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
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
