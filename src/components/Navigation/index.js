import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { View, Image } from "react-native-web";
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
      <View style={page_styles.align_icon}>
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
      </View>
    </ul>

    <ul>
    <View style={page_styles.align_icon}>
      <PersonIcon />
      <Link
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "18px",
          fontFamily: "monospace",
          paddingLeft: "10px",
        }}
        to={ROUTES.EDIT_PROFILE}
      >
        Edit Profile
      </Link>
      </View>
    </ul>

    <ul>
    <View style={page_styles.align_icon}>
      <MusicNoteIcon />
      <Link
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "18px",
          fontFamily: "monospace",
          paddingLeft: "10px",
        }}
        to={ROUTES.OPPORTUNITIES}
      >
        Opportunities
      </Link>
    </View>
    </ul>

    <ul>
    <View style={page_styles.align_icon}>
      <PeopleIcon />
      <Link
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "18px",
          fontFamily: "monospace",
          paddingLeft: "10px",
        }}
        to={ROUTES.USERS}
      >
        Users
      </Link>
    </View>
    </ul>

    <ul>
    <View style={page_styles.align_icon}>
      <RecentActorsIcon />
      <Link
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "18px",
          fontFamily: "monospace",
          paddingLeft: "10px",
        }}
        to={ROUTES.CONNECTIONS}
      >
        Connections
      </Link>
    </View>
    </ul>

    <ul>
    <View style={page_styles.align_icon}>
      <GroupIcon />
      <Link
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "18px",
          fontFamily: "monospace",
          paddingLeft: "10px",
        }}
        to={ROUTES.BANDS}
      >
        Bands
      </Link>
      </View>
    </ul>

    <ul>
    <View style={page_styles.align_icon}>
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
      </View>
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
