import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from './App';
import Home from './Home';
import Profs from './Profs';
import Prof from './Prof';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/profs/:profID" component={Prof} />
      <Route path="/profs" component={Profs} />
      <Route path="/app" component={App} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
