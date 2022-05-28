import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import FinalScore from '../components/FinalScore';

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
        <h2 data-testid="header-score">
          Você obteve
          {' '}
          {numberAssertions}
          {' '}
          acertos!
        </h2>
        <h2 data-testid="feedback-text">{feedbackMessage}</h2>
        <FinalScore />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberAssertions: state.player.assertions,
});

Feedback.defaultProps = {
  numberAssertions: 0,
};

Feedback.propTypes = {
  numberAssertions: PropTypes.number,
};

export default connect(mapStateToProps)(Feedback);
