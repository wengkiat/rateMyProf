import React, { Component } from "react";
import Prof from "./Prof.js";

class Profs extends Component {

  renderProf(props) {
    const { name, faculty, rating } = props;
    return (
      <div className="profs_box lightgrey_background">
        <div className="col-4 profs_boxphoto no_padding">
          <img src="/img/anonymous.jpg"/>
        </div>
        <div className="col-8 profs_boxdetails">
          <div className="profs_boxdetailsname font_uppermedium_content">
            {name}
          </div>
          <div className="profs_boxdetailsdept font_lowermedium_content">
            {faculty}
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
            <span className="profs_ratingval"> ({rating.toFixed(2)})</span>
          </div>
        </div>
      </div>
    );
  }

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
          {this.renderProf({
            name: "Steven Halim",
            faculty: "Department of Computer Science",
            rating: 4.5
          })}
          {this.renderProf({
            name: "Colin Tan",
            faculty: "Department of Computer Science",
            rating: 3.5
          })}
        </div>

      </div>
    );
  }
}

export default Profs;
