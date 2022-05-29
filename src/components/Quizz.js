import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Quizz.css';
import { setSendAssertionsToFeedbackPage, setScore, setTimer } from '../redux/actions';

class Quizz extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      selectedAnAnswer: false,
      question: <p>Carregando Questão</p>,
      // answers: [],
      assertions: 0,
      score: 0,
    };
  }

  componentDidMount() {
    // const { questions } = this.props;
    // console.log(questions);
  }

  componentDidUpdate(prevProps) {
    const { questions, disabled } = this.props;
    if (questions !== prevProps.questions) {
      this.renderQuestion();
      // console.log('embaralhar');
    }
    if (disabled !== prevProps.disabled) {
      this.renderQuestion();
      // console.log('NÃO embaralhar');
    }
  }

  nextQuestion = () => {
    const { resetTimer } = this.props;
    const { questionNumber } = this.state;
    // console.log(questionNumber);
    let currentQuestion = questionNumber;
    resetTimer();
    this.setState({
      questionNumber: (currentQuestion += 1),
      selectedAnAnswer: false,
    }, () => {
      const LIMIT_OF_QUESTIONS_INDEX = 4;
      if (questionNumber >= LIMIT_OF_QUESTIONS_INDEX) {
        const { history } = this.props;
        // const { history, setSendAssertions } = this.props;
        // const { assertions } = this.state;
        // setSendAssertions(assertions);
        history.push('/feedback');
        // esse return é pra parar de chamar o resto da função abaixo, já que não vai ter mais questões...pq tava dando erro de pedir caracteristicas de questões que não são existentes.
        return;
      }
      this.renderQuestion();
    });
  };

  renderQuestion = () => {
    const { questionNumber } = this.state;
    const { questions, disabled } = this.props;
    // console.log(questions);

    const answerBorders = () => {
      const anwersButtons = document.querySelectorAll('.answer-btn');
      anwersButtons.forEach((button) => {
        // console.log(button);
        if (button.classList.contains('co-an')) {
          button.classList.add('correct-answer');
        }
        if (button.classList.contains('wr-an')) {
          button.classList.add('wrong-answer');
        }
      });
    };

    const addPointsToScore = ({ difficulty }) => {
      const ratio = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const { countdown } = this.props;
      const TEN = 10;
      const questionScore = TEN + (countdown * ratio[difficulty]);
      // const { score } = this.state;
      this.setState((prevState) => ({
        score: prevState.score + questionScore,
      }), () => {
        const { score } = this.state;
        const { sendSetScore } = this.props;
        sendSetScore(score);
      });
    };

    const rightAnswer = ({ target }, question) => {
      // console.log('resposta certa');
      this.setState({ selectedAnAnswer: true }, () => {
        target.classList.toggle('clicked-correct');
        answerBorders();
        this.setState((prevState) => ({
          assertions: prevState.assertions + 1,
        }), () => {
          const { setSendAssertions } = this.props;
          const { assertions } = this.state;
          addPointsToScore(question);
          setSendAssertions(assertions);
        });
      });
      // questionNumber += 1;a
    };

    const wrongAnswer = ({ target }) => {
      // console.log('resposta errada');
      this.setState({ selectedAnAnswer: true }, () => {
        target.classList.toggle('clicked-wrong');
        answerBorders();
      });
      // questionNumber += 1;
    };

    if (questions.results !== undefined && questions.results.length > 0) {
      // console.log('isso rodou');
      const activeQuestion = questions.results[questionNumber];
      // console.log(activeQuestion);
      const wrongAnswers = activeQuestion.incorrect_answers.map((answer, index) => (
        // <p >
        <button
          type="button"
          className="answer-btn wr-an"
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
          className="answer-btn co-an"
          onClick={ (event) => rightAnswer(event, activeQuestion) }
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
            {activeQuestion.question}
          </p>
          <div data-testid="answer-options">
            <p>Respostas:</p>
            {answersList}
          </div>
        </div>
      );
      if (disabled) {
        this.setState({ question: renderedQuestion, selectedAnAnswer: true });
      } else this.setState({ question: renderedQuestion });
    }
  }

  render() {
    const { question, selectedAnAnswer } = this.state;
    // const { score } = this.props;

    const nextBtn = (
      <button type="button" onClick={ this.nextQuestion } data-testid="btn-next">
        Proxima Pergunta
      </button>
    );

    return (
      <div>
        {/* <h2>
          Acertos:
          { ' ' }
          { score }
        </h2> */}
        { question }
        { selectedAnAnswer ? nextBtn : <p /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  disabled: state.timer.disabled,
  countdown: state.timer.countdown,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  setSendAssertions: (state) => dispatch(setSendAssertionsToFeedbackPage(state)),
  sendSetScore: (state) => dispatch(setScore(state)),
  resetTimer: () => dispatch(setTimer(false)),
});

Quizz.propTypes = {
  history: PropTypes.shape(),
  push: PropTypes.func,
  questions: PropTypes.objectOf(PropTypes.any),
  disabled: PropTypes.bool,
  setSendAssertions: PropTypes.func.isRequired,
  sendSetScore: PropTypes.func.isRequired,
  // score: PropTypes.number.isRequired,
  countdown: PropTypes.number.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

Quizz.defaultProps = {
  push: () => {},
  history: {},
  questions: [],
  disabled: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizz);
