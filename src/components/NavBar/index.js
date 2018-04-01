import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { AUTH_TOKEN } from '../Login/constants';

import './style.css';

function NavBar() {
  // const authToken = localStorage.getItem(AUTH_TOKEN);
  const authToken = 1;
  return (
    <div className="navbar">

      <NavLink
        to="/new/1"
        className="navbar__link"
        activeClassName="navbar__link--active"
      >
        New
      </NavLink>

      <NavLink
        to="/top"
        className="navbar__link"
        activeClassName="navbar__link--active"
      >
        Top
      </NavLink>

      {
        authToken && (
          <NavLink
            to="/create"
            className="navbar__link"
            activeClassName="navbar__link--active"
          >
              Create New Link
          </NavLink>
        )
      }

      <NavLink
        to="/search"
        className="navbar__link"
        activeClassName="navbar__link--active"
      >
        Search
      </NavLink>

      {
        authToken ? (
          <Link
            to="/"
            className="navbar__link"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
            }}
          >
            Logout
          </Link>
        ) : (
          <NavLink
            to="/login"
            className="navbar__link"
            activeClassName="navbar__link--active"
          >
            Login
          </NavLink>
        )
      }

    </div>
  );
}

export default withRouter(NavBar);
