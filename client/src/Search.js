import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchProfs } from "./api.js";

const queryString = require("query-string");

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      profs: []
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search).q;
    this.setState({ query: query });
    console.log(query);
    console.log(this.state);

    searchProfs(query)
      .then(res => {
        this.setState({ profs: res });
      });
  }

  renderProf(props) {
    const { name, faculty, rating, id } = props;
    return (
      <Link to={`/profs/${id}`}>
        <div className="profs_box lightgrey_background" key={id}>
          <div className="col-4 profs_boxphoto no_padding">
            <img src="/img/anonymous.jpg"/>
          </div>
          <div className="col-8 profs_boxdetails">
            <div className="profs_boxdetailsname">
              {name}
            </div>
            <div className="profs_boxdetailsdept font_lowermedium_content">
              {faculty}
            </div>
            <div className="profs_boxdetailsrating font_lowermedium_content">
            Rating:&nbsp;
              <span className="profs_ratingstar">
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <span className="profs_ratingstars" id="profs_ratingstars_1">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </span>
              </span>
              <span className="profs_ratingval"> ({rating.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div className="padding_1">
        <div className="profs_searchresult font_uppermedium">
        Search Result for <br className="mobile_only"/>{this.state.query}
        </div>

        <div className="profs_boxlist">
          {this.state.profs.map(prof => {
            return this.renderProf({
              id: prof.id,
              name: prof.first_name + prof.last_name,
              faculty: prof.department,
              rating: 0
            });
          })}
        </div>
      </div>
    );
  }
}

export default Search;
