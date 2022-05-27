import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

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
    const { numberAssertions } = this.props;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h2>
          Você obteve
          {' '}
          {numberAssertions}
          {' '}
          acertos!
        </h2>
        <h2 data-testid="feedback-text">{feedbackMessage}</h2>
        <button
          type="button"
          onClick={ this.redirectToRankingPage }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberAssertions: state.questions.assertions,
});

Feedback.defaultProps = {
  numberAssertions: 0,
  push: () => {},
  history: {},
};

Feedback.propTypes = {
  numberAssertions: PropTypes.number,
  history: PropTypes.shape(),
  push: PropTypes.func,
};

export default connect(mapStateToProps)(Feedback);
