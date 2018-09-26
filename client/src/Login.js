import React, { Component } from 'react';
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
          <button type="button" className="btn btn-primary login__button login-fb col-12 col-sm-5">
            <div className="col-3 login-fb__image ">
              <i class="fab fa-facebook-square fa-3x login-fb__icon"></i>
            </div>
            <div className="col-9 login-fb__text">
              <table className="login-fb__table">
                <td className="login-fb__cell">
                  Login using Facebook
                </td>
              </table>
            </div>
          </button>
          <button type="button" className="btn btn-danger login__button login-google col-12 col-sm-5">
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
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
