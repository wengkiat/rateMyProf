import React, { Component } from 'react';

function Form(props) {
  const {
    caption,
    placeholder
  } = props

  return (
    <form action="" className="index_form">
      <input type="text" placeholder={placeholder} className="index_formtext col-10"/>
      <button type="submit" className="index_formbutton col-2">{caption}</button>
    </form>
  )
}

class Home extends Component {
  render() {
    return (
      <div>
        <div className="index_maincontent">
          <div className="index_transparentbox">
            <div className="index_searchcontainer padding_1">
              <div className="index_tablecontainer">
                <Form placeholder="Find a Professor by Name" caption="GO"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
