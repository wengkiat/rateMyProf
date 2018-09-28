import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("Login");
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        Logging out...
      </div>
    )
  }
}

export default Logout;
