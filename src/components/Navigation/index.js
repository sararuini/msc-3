import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { View, Text, Image, Dimensions } from "react-native-web";
import page_styles from "./styles";
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsIcon from '@material-ui/icons/Notifications';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PeopleIcon from '@material-ui/icons/People';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <View style={page_styles.top_container}>
      <div>
        <Link style={{ textDecoration: "none" }} to={ROUTES.HOME}>
          <Image
            style={{ width: 150, height: 150 }}
            source={{
              uri:
                "https://live.staticflickr.com/65535/50277251243_fbd7f7b541_o.png",
            }}
          />
        </Link>

        <View style={page_styles.menu_links}>
          <ul>
          <SettingsIcon /> 
          <Link style={{ textDecoration: "none", padding: "10px" }} to={ROUTES.SETTINGS}>
            Settings
          </Link>
          </ul>
          <ul>
            <PersonIcon />
          <Link style={{ textDecoration: "none", padding: "10px" }} to={ROUTES.EDIT_PROFILE}>
            Edit Profile
          </Link>
          </ul>

          <ul>
          <MusicNoteIcon />
          <Link style={{ textDecoration: "none", padding: "10px" }} to={ROUTES.OPPORTUNITIES}>
            Opportunities
          </Link>
          </ul>
          
          <ul>
            <PeopleIcon />
            <Link style={{ textDecoration: "none", padding: "10px" }} to={ROUTES.USERS}>
            Users
          </Link>
          </ul>
          
          <ul>
          <RecentActorsIcon />
            <Link style={{ textDecoration: "none", padding: "10px" }} to={ROUTES.CONNECTIONS}>
            Connections
          </Link>
          </ul>
          
          <ul>
          <GroupIcon />
            <Link style={{ textDecoration: "none", padding: "10px" }} to={ROUTES.BANDS}>
            Bands
          </Link>
          </ul>
          
          <ul>
            <NotificationsIcon />
            <Link style={{ textDecoration: "none", padding: "10px" }} to={ROUTES.NOTIFICATIONS}>
            Notifications
          </Link>
          </ul>
          

          <SignOutButton />
        </View>
      </div>
    </View>
  </div>
);

const NavigationNonAuth = () => (
  <View style={page_styles.navbar_container}>
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
