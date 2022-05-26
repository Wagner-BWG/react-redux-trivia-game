import React from 'react';

let questionNumber = 0;

export const rightAnswer = () => {
  console.log('resposta certa');
  questionNumber += 1;
};

export const wrongAnswer = () => {
  console.log('resposta errada');
  questionNumber += 1;
};

export const renderQuestion = (questions) => {
  console.log('isso rodou');
  const activeQuestion = questions.results[questionNumber];
  console.log(activeQuestion);

  // if (activeQuestion !== undefined) {
  const wrongAnswers = activeQuestion.incorrect_answers.map((answer, index) => (
    // <p >
    <button
      type="button"
      onClick={ wrongAnswer }
      data-testid={ `wrong-answer-${index}` }
      key={ answer }
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
    >
      {activeQuestion.correct_answer}
    </button>
    // <br />
    // </p>
  );

  const answersList = [
    ...wrongAnswers,
    correctAnswer,
  ];

  console.log(answersList);
  const MAGIC_NUMBER = 0.5;
  answersList.sort(() => Math.random() - MAGIC_NUMBER);
  console.log(answersList);

  return (
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
};
