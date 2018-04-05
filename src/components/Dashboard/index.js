import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LinkListPage from '../LinkListPage';
import Login from '../Login';
import CreateLink from '../CreateLink';

import './style.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Switch>
        <Route exact path="/" component={LinkListPage} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateLink} />
      </Switch>
    </div>
  );
}

export default Dashboard;
