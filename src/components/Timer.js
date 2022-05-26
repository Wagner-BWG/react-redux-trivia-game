import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timerCounter: 30,
      disabled: false,
    };
  }

  componentDidMount() {
    this.setTimerCountDown();
  }

  setTimerCountDown = () => {
    const ONE_SECOND = 1000;
    const WHOLE_INTERVAL = 30000;
    this.timerCountdown = setInterval(() => {
      console.log('interval');
      this.setState((prevState) => ({
        timerCounter: prevState.timerCounter - 1,
      }));
    }, ONE_SECOND);

    setTimeout(() => {
      clearInterval(this.timerCountdown);
      this.setState({
        disabled: true,
      }, () => {
        const { disabled } = this.state;
        console.log(disabled);
        const { setDisabledBtn } = this.props;
        setDisabledBtn(true);
      });
    }, WHOLE_INTERVAL);
  }

  render() {
    const { timerCounter } = this.state;
    return (
      <div>
        <h2>{timerCounter}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDisabledBtn: (state) => dispatch(setTimer(state)),
});

Timer.propTypes = {
  setDisabledBtn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
