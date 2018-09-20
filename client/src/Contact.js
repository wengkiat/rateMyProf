import React, { Component } from 'react';

class Contact extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="padding_1">
        <div className="contact font_uppermedium_content">
          Contact Us
        </div>

        <div className="contact_text font_lowermedium_content">
          Do you find bugs in our App? Or is there a prof that is not included yet? Or any feedback for us? <br/>
          Feel free to contact us using the form below. 
        </div>

        <form className="lightgrey_background margin_1 padding_2">
          <div className="form-group">
            <label for="form_name">Name</label>
            <input type="text" className="form-control" id="form_name" placeholder="Enter Your Name"/>
          </div>
          <div className="form-group">
            <label for="form_email">Email Address</label>
            <input type="text" className="form-control" id="form_email" placeholder="Enter Your Email Address"/>
          </div>
          <div className="form-group">
            <label for="form_comments">Comments</label>
            <input type="text" className="form-control" id="form_comments" placeholder="Enter Your Comments"/>
          </div>
        </form>

      </div>
    );
  }
}

export default Contact;
