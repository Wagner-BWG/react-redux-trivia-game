import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Game extends Component {
  async componentDidMount() {
    const { dispatch, token } = this.props;
    await dispatch(fetchQuestions(token));
    const { playerToken, history } = this.props;
    const { response_code: responseCode } = playerToken;
    console.log(responseCode);
    const MAGIC_NUMBER = 3;
    if (responseCode === MAGIC_NUMBER) {
      history.push('/');
    }
  }

  render() {
    const { questions } = this.props;
    const activeQuestion = questions[0];
    console.log(activeQuestion);
    let question = (<p>Carregando Questão</p>);

    if (activeQuestion !== undefined) {
      const wrongAnswers = activeQuestion.incorrect_answers.map((answer, index) => (
        <p key={ answer } data-testid={ `wrong-answer-${index}` }>
          <button type="button">
            {answer}
          </button>
          <br />
        </p>
      ));

      const correctAnswer = (
        <p key={ activeQuestion.correct_answer } data-testid="correct-answer">
          <button type="button">
            {activeQuestion.correct_answer}
          </button>
          <br />
        </p>
      );

      const answersList = [
        ...wrongAnswers,
        correctAnswer,
      ];

      const MAGIC_NUMBER = 0.5;
      answersList.sort(() => Math.random() - MAGIC_NUMBER);

      question = (
        <div>
          <p>Questão</p>
          <p data-testid="question-category">
            {`Categoria: ${activeQuestion.category}`}
          </p>
          <p data-testid="question-text">
            {`Pergunta: ${activeQuestion.question}`}
          </p>
          <div data-testid="answer-options">
            <p>Respostas:</p>
            {answersList}
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <h1>Game</h1>
        <div>
          <p>Quizz</p>
          {question}
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
  playerToken: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape(),
  push: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
};

Game.defaultProps = {
  push: () => {},
  history: {},
  questions: [],
};

export default connect(mapStateToProps)(Game);
