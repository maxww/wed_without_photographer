import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import MainComponent from './src/components/MainComponent';
import Pictures from './src/components/Pictures';
import App from './src/App';
require('./stylesheets/main.scss');

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MainComponent} />
      <Route path='/upload' component={MainComponent} />
      <Route path="/pictures" component={Pictures} />
    </Route>
  </Router>), document.getElementById('app'))
