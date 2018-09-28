import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("Login");

    setInterval(() => {
      if (window.gapi && window.gapi.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {
          auth2.signOut().then(res => this.props.history.goBack())
        }
      }
    }, 500);
  }

  render() {
    return (
      <div>
        Logging out...
        <div style={{ display: "none" }}>
          <GoogleLogin
            clientId="146566530913-jbveuscvcisi53fknmrdvm13lg4hfumm.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={() => alert("123")}
            onFailure={() => alert("456")}
          />
          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={() => alert("789")}
          >
          </GoogleLogout>
        </div>
      </div>
    )
  }
}

export default Logout;
