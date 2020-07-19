import React from 'react';
import { Link} from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
//import {SearchBar} from './searchBar';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.SETTINGS}>Settings</Link>
    </li>
    <li>
      <Link to={ROUTES.EDIT_PROFILE}>Modify Profile</Link>
    </li>
    <li>
      <Link to={ROUTES.ALL_MESSAGES}>Messages</Link>
    </li>
    <li>
      <Link to={ROUTES.OPPORTUNITIES_STATUS}>Opportunities</Link>
    </li>
    <li>
      <Link to={ROUTES.OWN_PROFILE}>My Profile</Link>
    </li>
    <li>
      <Link to={ROUTES.USERS}>Users</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;