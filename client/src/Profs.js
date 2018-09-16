import React, { Component } from 'react';
import Prof from './Prof.js';

class Profs extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        {JSON.stringify(match)}
      </div>
    );
  }
}

export default Profs;
