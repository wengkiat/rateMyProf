import React, { Component } from "react";
import "./Home.css";

function Form(props) {
  const {
    caption,
    placeholder
  } = props;

  return (
    <form action="/search" className="search__form">
      <input
        type="text"
        name="q"
        placeholder={placeholder}
        className="search__text col-10"
      />
      <button type="submit" className="search__button col-2">
        {caption}
      </button>
    </form>
  );
}

class Home extends Component {
  render() {
    return (
      <div>
        <div className="index">
          <div className="index__background--transparent">
            <div className="index__search-container page">
              <div className="index__search search">
                <Form
                  placeholder="Search Prof's Name"
                  caption="GO"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
