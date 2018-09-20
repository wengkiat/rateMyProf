import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from './App';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Profs from './Profs';
import Prof from './Prof';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/profs/:profID" component={Prof} />
      <Route path="/profs" component={Profs} />
      <Route path="/app" component={App} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
