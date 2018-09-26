import React, { Component } from 'react';
import "./Contact.css";

class Contact extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="page">
        <div className="contact font-size--xl">
          Contact Us
        </div>

        <div className="contact__text font-size--m">
          Do you find bugs in our App? Or is there a prof that is not included yet? Or any feedback for us? <br/>
          Feel free to contact us using the form below. 
        </div>

        <form className="background--lightgrey contact__form contact-form">
          <div className="form-group">
            <label className="contact-form__label" for="form_name">Name</label>
            <input type="text" className="form-control" id="form_name" placeholder="Enter Your Name"/>
          </div>
          <div className="form-group">
            <label className="contact-form__label" for="form_email">Email Address</label>
            <input type="text" className="form-control" id="form_email" placeholder="Enter Your Email Address"/>
          </div>
          <div className="form-group">
            <label className="contact-form__label" for="form_comments">Comments</label>
            <input type="text" className="form-control" id="form_comments" placeholder="Enter Your Comments"/>
          </div>
        </form>

      </div>
    );
  }
}

export default Contact;
