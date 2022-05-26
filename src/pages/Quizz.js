import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Quizz extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      selectedAnAnswer: false,
      question: <p>Carregando Questão</p>,
      // answers: [],
    };
  }

  componentDidMount() {
    const { questions } = this.props;
    console.log(questions);
  }

  componentDidUpdate(prevProps) {
    const { questions, disabled } = this.props;
    if (questions !== prevProps.questions) {
      this.renderQuestion();
      console.log('embaralhar');
    }
    if (disabled !== prevProps.disabled) {
      this.renderQuestion();
      console.log('NÃO embaralhar');
    }
  }

  nextQuestion = () => {
    const { questionNumber } = this.state;
    let currentQuestion = questionNumber;
    this.setState(
      { questionNumber: (currentQuestion += 1), selectedAnAnswer: false },
      () => this.renderQuestion(),
    );
  };

  renderQuestion = () => {
    const { questionNumber } = this.state;
    const { questions, disabled } = this.props;
    console.log('renderQuestion');

    const rightAnswer = () => {
      console.log('resposta certa');
      this.setState({ selectedAnAnswer: true });
      // questionNumber += 1;
    };

    const wrongAnswer = () => {
      console.log('resposta errada');
      this.setState({ selectedAnAnswer: true });
      // questionNumber += 1;
    };

    if (questions.results !== undefined && questions.results.length > 0) {
      console.log('isso rodou');
      const activeQuestion = questions.results[questionNumber];
      console.log(activeQuestion);
      const wrongAnswers = activeQuestion.incorrect_answers.map((answer, index) => (
        // <p >
        <button
          type="button"
          onClick={ wrongAnswer }
          data-testid={ `wrong-answer-${index}` }
          key={ answer }
          disabled={ disabled }
        >
          {answer}
        </button>
        // <br />
        // </p>
      ));

      const correctAnswer = (
        // <p>
        <button
          type="button"
          onClick={ rightAnswer }
          key={ activeQuestion.correct_answer }
          data-testid="correct-answer"
          disabled={ disabled }
        >
          {activeQuestion.correct_answer}
        </button>
        // <br />
        // </p>
      );

      // let answersList = [];
      // if (answersList.length === 0) {
      const answersList = [
        ...wrongAnswers,
        correctAnswer,
      ];

      const MAGIC_NUMBER = 0.5;
      answersList.sort(() => Math.random() - MAGIC_NUMBER);
      // }

      const renderedQuestion = (
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
      this.setState({ question: renderedQuestion });
    }
  }

  render() {
    const { question, selectedAnAnswer } = this.state;

    const nextBtn = (
      <button type="button" onClick={ this.nextQuestion } data-testid="btn-next">
        Proxima Pergunta
      </button>
    );

    return (
      <div>
        { question }
        { selectedAnAnswer ? nextBtn : <p /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  disabled: state.timer.disabled,
});

Quizz.propTypes = {
  questions: PropTypes.objectOf(PropTypes.any),
  disabled: PropTypes.bool,
};

Quizz.defaultProps = {
  questions: [],
  disabled: false,
};

export default connect(mapStateToProps)(Quizz);
