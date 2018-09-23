import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from './App';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Rate from './Rate';
import Login from './Login';
import SimpleLogin from './SimpleLogin';
import Profs from './Profs';
import Prof from './Prof';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/profs/:profID" component={Prof} />
      <Route path="/profs" component={Profs} />
      <Route path="/rate" component={Rate} />
      <Route path="/app" component={App} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/simplelogin" component={SimpleLogin} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
