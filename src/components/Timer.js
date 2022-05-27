import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer, setCountdown } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      // timerCounter: 30,
      // timerCounter: 2,
      disabled: false,
    };
    this.timerCountdown = this.timerCountdown.bind(this);
  }

  componentDidMount() {
    this.setTimerCountDown();
  }

  setTimerCountDown = () => {
    const { countdown } = this.props;
    const ONE_SECOND = 1000;
    const WHOLE_INTERVAL = 30000;
    // const WHOLE_INTERVAL = 2000;
    function timerCountdown() {
      setInterval(() => {
      console.log('interval');
      // this.setState((prevState) => ({
      //   timerCounter: prevState.timerCounter - 1,
      // }));
      setCountdown(countdown - 1);
      }, ONE_SECOND);
    }

    setTimeout(() => {
      clearInterval(timerCountdown);
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
    // const { timerCounter } = this.state;
    const { countdown } = this.props;

    return (
      <div>
        <h2>{countdown}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  countdown: state.timer.countdown,
});

const mapDispatchToProps = (dispatch) => ({
  setDisabledBtn: (state) => dispatch(setTimer(state)),
  setCountdown: (state) => dispatch(setCountdown(state)),
});

Timer.propTypes = {
  setDisabledBtn: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
  setCountdown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
