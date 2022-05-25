import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  render() {
    const { playerNameInfo, playerURLInfo, playerEmailInfo } = this.props;
    const { score } = this.state;
    console.log(playerNameInfo, playerURLInfo, playerEmailInfo);
    const hashUserEmail = md5(playerEmailInfo).toString();
    console.log(hashUserEmail);
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hashUserEmail}` }
            alt="player avatar"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{playerNameInfo}</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerNameInfo: state.playerName,
  playerEmailInfo: state.playerEmail,
  playerURLInfo: state.imageURL,
});

Header.propTypes = {
  playerNameInfo: PropTypes.string.isRequired,
  playerURLInfo: PropTypes.string.isRequired,
  playerEmailInfo: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
