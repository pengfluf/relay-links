import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../NavBar';
import Login from '../Login';
import CreateLink from '../CreateLink';
import Search from '../Search';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Redirect exact from="/" to="/new/1" />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateLink} />
        <Route path="/search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;
