import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import Footbar from "../Footbar";
import SettingsPage from "../Settings";
import { ModifyProfile } from "../Profile";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import UsersDisplayPage from "../Users";
import ConnectionPage from "../Connections";
import OpportunityPage from "../Opportunities";
import NotificationPage from "../Notifications";
import BandPage from "../Band";
import { View, ScrollView } from "react-native-web";
import page_styles_template from "./styles";

const App = () => {
  return (
    <Router>
      <View>
        <div>
          <Navigation/> 
          <ScrollView style={page_styles_template.scrollable_container}>
            <div>
              
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
                <Route path={ROUTES.HOME} component={HomePage} />

              <Route path={ROUTES.SETTINGS} component={SettingsPage} />
              <Route path={ROUTES.USERS} component={UsersDisplayPage} />

                <Route path={ROUTES.EDIT_PROFILE} component={ModifyProfile} />
              <Route path={ROUTES.OPPORTUNITIES} component={OpportunityPage} />
              <Route path={ROUTES.CONNECTIONS} component={ConnectionPage} />
              <Route path={ROUTES.BANDS} component={BandPage} />
              <Route path={ROUTES.NOTIFICATIONS} component={NotificationPage} />
            </div>
          </ScrollView> 
        </div>
        <Footbar style={page_styles_template.footbar} />
      </View>
    </Router>
  );
};

export default withAuthentication(App);


{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}