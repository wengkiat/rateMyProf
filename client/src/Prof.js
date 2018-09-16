import React, { Component } from 'react';

class Prof extends Component {
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

export default Prof;
