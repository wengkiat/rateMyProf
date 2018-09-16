import React, {Component} from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';

class Home extends Component {
  render() {
    return (<div>
      <h2>Rate Your Professor</h2>
      <form action="/action_page.php">
        First name:
        <input type="text" name="fname"/>
        <br/>
        Last name:
        <input type="text" name="lname"/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>)
  }
}

export default Home;
