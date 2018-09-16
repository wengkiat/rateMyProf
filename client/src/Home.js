import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div class="index_maincontent">
          <div class="index_transparentbox">
            <div class="index_searchcontainer padding_1">
              <div class="index_tablecontainer">
                <form action="" class="index_form">
                  <input type="text" placeholder="Find a Professor by Name" class="index_formtext col-10"/>
                  <button tyoe="submit" class="index_formbutton col-2">GO</button>
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
