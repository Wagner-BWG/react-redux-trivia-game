import React, { Component } from 'react';
import Quizz from '../components/Quiz';
import Header from '../components/Header';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Game</h1>
        <Quizz />
      </div>
    );
  }
}
