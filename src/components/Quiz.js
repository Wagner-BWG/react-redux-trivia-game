import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../redux/actions';

class Quizz extends React.Component {
  async componentDidMount() {
    const { dispatch, token } = this.props;
    console.log(`token: ${token}`);
    await dispatch(fetchQuestions(token));
  }

  render() {
    return (
      <p>Quizz</p>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.playerToken.token,
});

Quizz.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Quizz);
