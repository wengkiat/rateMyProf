import React, { Component } from 'react';

class Login extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="padding_1">
        <div className="login font_uppermedium_content">
          Login Using Existing Account
        </div>
        <div className="login_methods font_medium_content">
          <button type="button" className="btn btn-primary login_fb col-12 col-sm-5 no_padding">
            <div className="col-3 login_fbimage ">
              <i class="fab fa-facebook-square fa-3x"></i>
            </div>
            <div className="col-9 login_fbtext font_lowermedium_content">
              <table>
                <td>
                  Login using Facebook
                </td>
              </table>
            </div>
          </button>
          <button type="button" className="btn btn-danger login_google col-12 col-sm-5 no_padding">
            <div className="col-3 login_googleimage">
              <i class="fab fa-google-plus-square fa-3x"></i>
            </div>
            <div className="col-9 login_googletext font_lowermedium_content">
              <table>
                <td>
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
