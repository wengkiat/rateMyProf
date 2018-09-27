import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchProfs } from "./api.js";
import "./Search.css";

const queryString = require("query-string");

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      profs: [],
      isProfData: false,
      isCommentData: false,
      isOver: false
    };
  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.search).q;
    this.setState({ query: query });

    searchProfs(query)
      .then(res => {
        this.setState({ profs: res });
      });
  }

  renderProf(props) {
    const { name, faculty, rating, id } = props;
    const starWidth = {width: (rating/5 * 100) + "%"};
    return (
      <Link to={`/profs/${id}`}>
        <div className="search-result__prof prof background--lightgrey" key={id}>
          <div className="col-4 prof__photobox">
            <img src={"/img/"+ name.toLowerCase().split(" ").join("_") +".jpg"} className="prof__photo"/>
          </div>
          <div className="col-8 prof__overview">
            <div className="prof__name">
              {name}
            </div>
            <div className="prof__department font-size--m">
              {faculty}
            </div>
            <div className="prof-overview-rating font-size--m">
            Rating:&nbsp;
              <span className="rate-value">
                <i className="fas fa-star star--dark"></i>
                <i className="fas fa-star star--dark"></i>
                <i className="fas fa-star star--dark"></i>
                <i className="fas fa-star star--dark"></i>
                <i className="fas fa-star star--dark"></i>
                <span className="rate-value--coloured" style={starWidth}>
                  <i className="fas fa-star star--bright"></i>
                  <i className="fas fa-star star--bright"></i>
                  <i className="fas fa-star star--bright"></i>
                  <i className="fas fa-star star--bright"></i>
                  <i className="fas fa-star star--bright"></i>
                </span>
              </span>
              <span className="prof-overview-rating__value"> ({rating.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div className="page search">
        <div className="search__title font-size--xl">
        Search Result for <br className="mobile_only"/>"{this.state.query}"
        </div>

        <div className="search__result search-result">
          {this.state.profs.map(prof => {
            return this.renderProf({
              id: prof.id,
              name: prof.first_name + " " +prof.last_name,
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
