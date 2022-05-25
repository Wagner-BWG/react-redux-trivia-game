import React, { Component } from 'react';
import Quizz from '../components/Quiz';

export default class Game extends Component {
  render() {
    return (
      <div>
        Game
        <Quizz />
      </div>
    );
  }
}
