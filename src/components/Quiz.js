import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../redux/actions';

class Quizz extends React.Component {
  async componentDidMount() {
    const { dispatch, token } = this.props;
    await dispatch(fetchQuestions(token));
  }

  render() {
    const { questions } = this.props;
    const activeQuestion = questions[0];
    console.log(activeQuestion);
    let question = (<p>Carregando Questão</p>);

    if (activeQuestion !== undefined) {
      // const answers = [
      //   activeQuestion.correct_answer,
      //   ...activeQuestion.incorrect_answers,
      // ];

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
        <p>Quizz</p>
        {question}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.playerToken.token,
  questions: state.questions,
});

Quizz.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
};

Quizz.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps)(Quizz);
