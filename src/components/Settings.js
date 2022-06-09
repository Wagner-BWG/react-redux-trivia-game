import React, { Component } from 'react';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">settings</h1>
        <span>
          <input type="checkbox" />
          Hard mode.
        </span>
      </div>
    );
  }
}

export default Settings;
