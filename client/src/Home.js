import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div class="forheader bg-light">
          <nav id="main_navbar" class="navbar navbar-expand-sm navbar-light">
            <a class="navbar-brand app-icon" href="#"><img src="img/temporary_image.png"/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Contact Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Login</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="index_maincontent">
          <div class="index_transparentbox">
            <div class="index_searchcontainer padding_1 col-xs-12">
              <div class="index_tablecontainer">
                <form action="" class="index_form">
                  <input type="text" placeholder="Search for a Professor's Name" class="index_formtext col-sm-10"/>
                  <button tyoe="submit" class="index_formbutton col-sm-2"></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
