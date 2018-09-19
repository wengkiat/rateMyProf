import React, { Component } from 'react';
import Prof from './Prof.js';

class Profs extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="padding_1">
        <div className="profs_searchresult font_uppermedium">
          Search Result for "Foo Bar"
        </div>

        <div className="profs_boxlist">
          <div className="profs_box lightgrey_background">
            <div className="col-4 profs_boxphoto no_padding">
              <img src="/img/anonymous.jpg"/>
            </div>
            <div className="col-8 profs_boxdetails">
              <div className="profs_boxdetailsname font_uppermedium_content">
                Foo Bar
              </div>
              <div className="profs_boxdetailsdept font_lowermedium_content">
                Department of Computer Science
              </div>
              <div className="profs_boxdetailsrating font_lowermedium_content">
                Average rating: 4.85 / 5.00
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Profs;
