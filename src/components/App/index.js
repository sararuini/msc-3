import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import SettingsPage from '../Settings';
import AdminPage from '../Admin';
import {ModifyProfile, PublicProfile }from '../Profile';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SETTINGS} component={SettingsPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path = {ROUTES.PROFILE_MODIFY} component={ModifyProfile}/>
      <Route path = {ROUTES.USER_PROFILE} component={PublicProfile}/>
    </div>
  </Router>
);

export default withAuthentication(App);
