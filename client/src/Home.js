import React, { Component } from "react";
import { searchProfs } from "./api.js";
import "./Home.css";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      profs: []
    };

    this.onQueryChange = this.onQueryChange.bind(this);
  }

  onQueryChange(event) {
    const query = event.target.value;
    this.setState({ query: query });

    searchProfs(query).then(res => {
      if (Array.isArray(res))
        this.setState({ profs: res });
      else
        this.setState({ profs: [] });
    });
  }

  renderForm() {
    return (
      <form action="/search" className="search__form">
        <input
          type="text"
          name="q"
          className="search__text col-10"
          value={this.state.query}
          onChange={this.onQueryChange}
          placeholder="Search Prof's Name"
          list="profs"
        />
        <datalist id="profs">
          {this.state.profs.map(prof =>
            <option value={prof.first_name + " " + prof.last_name}/>
          )}
        </datalist>
        <button type="submit" className="search__button col-2">
          GO
        </button>
        <div className="preliminary-search-result">
          <div className="preliminary-search-result__box font-size--m col-10">
            <div className="preliminary-search-result__prof">
              Ben Leong
            </div>
            <div className="preliminary-search-result__prof">
              Steven Halim
            </div>
          </div>
          <div className="preliminary-search-result__emptyspace col-2">
          </div>
        </div>

      </form>
    );
  }

  render() {
    return (
      <div>
        <div className="index">
          <div className="index__background--transparent">
            <div className="index__search-container page">
              <div className="index__search search">
                {this.renderForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
