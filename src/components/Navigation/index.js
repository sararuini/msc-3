import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { View, Image, Dimensions } from "react-native-web";
import page_styles from "./styles";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import GroupIcon from "@material-ui/icons/Group";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <View style={page_styles.menu_links}>
    <ul>
      <Link to={ROUTES.HOME}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri:
              "https://live.staticflickr.com/65535/50277251243_fbd7f7b541_o.png",
          }}
        />
      </Link>
    </ul>
        <ul>
           <SettingsIcon />
       

        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
            paddingLeft: "10px",
          }}
          to={ROUTES.SETTINGS}
        >
          Settings
        </Link>
      </ul>
      

      <ul>
        <PersonIcon />
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
            paddingLeft: "10px"
          }}
          to={ROUTES.EDIT_PROFILE}
        >
          Edit Profile
        </Link>
      </ul>

      <ul>
        <MusicNoteIcon />
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
            paddingLeft: "10px"
          }}
          to={ROUTES.OPPORTUNITIES}
        >
          Opportunities
        </Link>
      </ul>
      
      <ul>
        <PeopleIcon />
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
            paddingLeft: "10px"
          }}
          to={ROUTES.USERS}
        >
          Users
        </Link>
      </ul>

      <ul>
        <RecentActorsIcon />
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
            paddingLeft: "10px"
          }}
          to={ROUTES.CONNECTIONS}
        >
          Connections
        </Link>
      </ul>

      <ul>
        <GroupIcon />
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
            paddingLeft: "10px"
          }}
          to={ROUTES.BANDS}
        >
          Bands
        </Link>
      </ul>

      <ul>
        <NotificationsIcon />
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
            paddingLeft: "10px",
          }}
          to={ROUTES.NOTIFICATIONS}
        >
          Notifications
        </Link>
      </ul>

      <ul>
        <SignOutButton />
      </ul>
  </View>
);

const NavigationNonAuth = () => (
  <View style={page_styles.menu_links}>
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

      <ul>
        <HomeIcon />
        <Link
          to={ROUTES.LANDING}
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
          }}
        >
          Landing
        </Link>
      </ul>
      <ul>
        <AccountCircleIcon />
        <Link
          to={ROUTES.SIGN_IN}
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "18px",
            fontFamily: "monospace",
          }}
        >
          Sign In
        </Link>
      </ul>
    </div>
  </View>
);

export default Navigation;
