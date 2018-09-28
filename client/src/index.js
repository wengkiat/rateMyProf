import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from './App';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Rate from './Rate';
import Login from './Login';
import Logout from './Logout';
import SimpleLogin from './SimpleLogin';
import Profs from './Profs';
import Prof from './Prof';
import Search from "./Search";
import NotFound from "./NotFound";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/profs/:profID/rate" component={Rate} />
      <Route exact path="/profs/:profID" component={Prof}/>
      <Route exact path="/profs" component={Profs}/>
      <Route exact path="/app" component={App}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/simplelogin" component={SimpleLogin}/>
      <Route path="/search" component={Search}/>
      <Route exact path="/" component={Home}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
