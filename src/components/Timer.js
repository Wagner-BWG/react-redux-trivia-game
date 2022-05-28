import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer, setCountdown } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timerCounter: 30,
      // timerCounter: 2,
      disabled: false,
    };
  }

  componentDidMount() {
    this.setTimerCountDown();
  }

  setTimerCountDown = () => {
    const ONE_SECOND = 1000;
    const WHOLE_INTERVAL = 30000;
    // const WHOLE_INTERVAL = 2000;
    this.timerCountdown = setInterval(() => {
      console.log('interval');
      this.setState((prevState) => ({
        timerCounter: prevState.timerCounter - 1,
      }), () => {
        const { timerCounter } = this.state;
        const { sendSetCountdown } = this.props;
        // console.log(timerCounter);
        sendSetCountdown(timerCounter);
      });
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
  sendSetCountdown: (state) => dispatch(setCountdown(state)),
});

Timer.propTypes = {
  setDisabledBtn: PropTypes.func.isRequired,
  sendSetCountdown: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
