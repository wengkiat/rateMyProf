import React, { Component } from 'react';

class About extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="padding_1">
        <div className="about font_uppermedium_content">
          About
        </div>

        <div className="about_text font_lowermedium_content">
          Do you feel annoyed with the fact that only your Professors can give you feedback and grade you and not the vice versa?<br/><br/>
          Fret not, with RateYourProfs, you can start grade and giving feedback to your professors.<br/><br/>
          Your feedback could help your Professors to improve themselves.<br/>
          Your feedback could also be useful for your juniors that considering to take modules taught by that particular prof.<br/><br/>
          So, what do you wait for? Sign up and start giving feedback to your profs!
        </div>        
      </div>
    );
  }
}

export default About;