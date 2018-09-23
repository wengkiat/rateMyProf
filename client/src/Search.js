import React, { Component } from "react";

const queryString = require("query-string");

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search).q;
    this.setState({ query: query });
    console.log(query);
    console.log(this.state);
  }

  render() {
    return (
      <p>{this.state.query}</p>
    );
  }
}

export default Search;
