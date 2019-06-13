import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import PrivateRoute from './PrivateRoute'

import AppPage from './App'
import LoginPage from './Login'

export default () => (
  <Router>
    <Switch>
      <PrivateRoute exact={true} path="/" component={AppPage} />
      <Route exact={true} path="/login" component={LoginPage} />
    </Switch>
  </Router>
)
