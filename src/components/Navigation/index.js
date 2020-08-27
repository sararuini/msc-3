import React from 'react';
import { Link} from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { View, Text} from "react-native-web";
//import page_styles from "./styles";
import page_styles_template from "../StyleTemplate"

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
  <View style={page_styles_template.main_page}>
    <ul>
    <View>
      <Text >
      <Link to={ROUTES.HOME}>Home</Link>
    </Text>
    <Text >
      <Link to={ROUTES.SETTINGS}>Settings</Link>
    </Text>
    <Text >
      <Link to={ROUTES.EDIT_PROFILE}>Edit Profile</Link>
    </Text>
    <Text >
      <Link to={ROUTES.OPPORTUNITIES}>Opportunities</Link>
    </Text>
    <Text>
       <Link to={ROUTES.USERS}>Users</Link>
    </Text>
    <Text>
       <Link to={ROUTES.CONNECTIONS}>Connections</Link>
    </Text>
    <Text>
       <Link to={ROUTES.BANDS}>Bands</Link>
    </Text>
    <Text>
       <Link to={ROUTES.NOTIFICATIONS}>Notifications</Link>
    </Text>

    {/*<Text>
       <Link to={ROUTES.EVENTS}>Events</Link>
    </Text> */}
    
  
      <SignOutButton />
    </View>
    
  </ul>
  </View>
  
);

const NavigationNonAuth = () => (
  <View style={page_styles_template.main_page}>
    <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
  </View>
);

export default Navigation;