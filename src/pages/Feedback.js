import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FinalScore from '../components/FinalScore';
import FeedbackHeader from '../components/FeedbackHeader';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      feedbackMessage: '',
    };
  }

  componentDidMount() {
    this.showFeedbackMessage();
  }

  redirectToRankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  redirectToHomePage = () => {
    const { history } = this.props;
    history.push('/');
  }

  showFeedbackMessage = () => {
    const { numberAssertions } = this.props;
    const CHECK_QUANTITY_CORRECT_ANSWERS = 3;

    if (numberAssertions >= CHECK_QUANTITY_CORRECT_ANSWERS) {
      this.setState({
        feedbackMessage: 'Well Done!',
      });
    } else {
      this.setState({
        feedbackMessage: 'Could be better...',
      });
    }
  }

  render() {
    const { feedbackMessage } = this.state;
    const { numberAssertions, totalScore } = this.props;
    return (
      <div>
        <FeedbackHeader />
        <h1>Feedback</h1>
        <h2>
          Você obteve
          {' '}
          {numberAssertions}
          {' '}
          acertos!
        </h2>
        <h2>
          <span>Com um total de </span>
          <span data-testid="feedback-total-score">{totalScore}</span>
          <span> pontos!</span>
        </h2>
        <h2 data-testid="feedback-text">{feedbackMessage}</h2>

        <FinalScore />

        <button
          className="button"
          type="button"
          onClick={ this.redirectToRankingPage }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
        <button
          className="button"
          type="button"
          onClick={ this.redirectToHomePage }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberAssertions: state.player.assertions,
  totalScore: state.player.score, // state.questions.assertions,
});

Feedback.defaultProps = {
  numberAssertions: 0,
  totalScore: 0,
  push: () => {},
  history: {},
};

Feedback.propTypes = {
  numberAssertions: PropTypes.number,
  totalScore: PropTypes.number,
  history: PropTypes.shape(),
  push: PropTypes.func,
};

export default connect(mapStateToProps)(Feedback);
