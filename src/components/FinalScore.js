import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FinalScore extends Component {
  render() {
    // const { score
    const { assertions } = this.props;
    return (
      <div>
        <h2>Final da Partida</h2>
        <p>total de acertos: </p>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <p>pontuaçõa final: </p>
        {/* <h3 data-testid="feedback-total-score">{score}</h3> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  // score: state.questions.score,
});

FinalScore.defaultProps = {
  assertions: 0,
};

FinalScore.propTypes = {
  assertions: PropTypes.number,
  // score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FinalScore);
