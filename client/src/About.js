import React, { Component } from 'react';
import "./About.css";

class About extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="page">
        <div className="about font-size--xl">
          About
        </div>

        <div className="about__text font-size--m">
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
