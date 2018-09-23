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
          Search Result for <br className="mobile_only"/>"Foo Bar"
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
                Rating:&nbsp;
                <span className="profs_ratingstar">
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <span className="profs_ratingstars" id="profs_ratingstars_1">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </span> 
                </span>
                <span className="profs_ratingval"> (4.5)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Profs;
