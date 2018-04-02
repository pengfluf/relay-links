import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from '../NavBar';
import LinkListPage from '../LinkListPage';
import Login from '../Login';
import CreateLink from '../CreateLink';
import Search from '../Search';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LinkListPage} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateLink} />
        <Route path="/search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;
