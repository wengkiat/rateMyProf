import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import "./Login.css";

class Login extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="page login">
        <div className="login__title font-size--xl">
          Login Using Existing Account
        </div>
        <div className="login__options font-size--l">
          <GoogleLogin
            type="button" className="btn btn-danger login__button login-google col-12 col-sm-5"
            clientId="146566530913-jbveuscvcisi53fknmrdvm13lg4hfumm.apps.googleusercontent.com"
            onSuccess={res => {
              localStorage.setItem("Login", res.Zi.access_token);
              this.props.history.goBack();
              window.initialize();
            }}
            onFailure={res => alert("Login unsuccessfully")}
          >
            <div className="col-3 login-google__image">
              <i class="fab fa-google-plus-square fa-3x login-google__icon"></i>
            </div>
            <div className="col-9 login-google__text">
              <table className="login-google__table">
                <td className="login-google__cell">
                  Login using Google
                </td>
              </table>
            </div>
          </GoogleLogin>
        </div>
      </div>
    );
  }
}

export default Login;
