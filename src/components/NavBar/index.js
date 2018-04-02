import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import {
  GC_USER_ID,
  GC_AUTH_TOKEN,
} from '../../constants';

import './style.css';

function NavBar() {
  const userID = localStorage.getItem(GC_USER_ID);
  return (
    <div className="navbar">

      <NavLink
        exact
        to="/"
        className="navbar__link"
        activeClassName="navbar__link--active"
      >
        Home
      </NavLink>

      {
        userID && (
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
        userID ? (
          <Link
            to="/"
            className="navbar__link"
            onClick={() => {
              localStorage.removeItem(GC_USER_ID);
              localStorage.removeItem(GC_AUTH_TOKEN);
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
