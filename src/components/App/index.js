import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import Footbar from '../Footbar';
import ConversationPage from '../Messenger';
import SettingsPage from '../Settings';
import {ModifyProfile, PublicProfile} from '../Profile';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import UsersDisplayPage from '../Users'
import OpportunityPage from '../Opportunities';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      {/* <Route path={ROUTES.CHATS} component={ConversationPage} />*/}
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SETTINGS} component={SettingsPage} />
      <Route path={ROUTES.USERS} component={UsersDisplayPage} />
      <Route path = {ROUTES.EDIT_PROFILE} component={ModifyProfile}/>
      <Route path = {ROUTES.OWN_PROFILE} component={PublicProfile}/>
      <Route path = {ROUTES.OPPORTUNITIES} component={OpportunityPage}/>
      <Footbar />
    </div>
  </Router>
);

export default withAuthentication(App);
