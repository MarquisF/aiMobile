import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Assets from '../views/Assets';
import Upcoming from '../views/Upcoming';
import Alerts from '../views/Alerts';
import Tasks from '../views/Tasks';
import Me from '../views/Me';

export default class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Assets} />
          <Route path='/assets' component={Assets} />
          <Route path='/upcoming' component={Upcoming} />
          <Route path='/alerts' component={Alerts} />
          <Route path='/tasks' component={Tasks} />
          <Route path='/me' component={Me} />
        </div>
      </Router>
    )
  }
}