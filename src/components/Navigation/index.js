import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { View, Text, Image } from "react-native-web";
import page_styles from "./styles";

const logo = {
  uri: "https://flic.kr/p/2jAU4Jz",
  width: 50,
  height: 50,
};

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
          <Link style={{ textDecoration: "none" }} to={ROUTES.SETTINGS}>
            Settings
          </Link>

          <Link style={{ textDecoration: "none" }} to={ROUTES.EDIT_PROFILE}>
            Edit Profile
          </Link>

          <Link style={{ textDecoration: "none" }} to={ROUTES.OPPORTUNITIES}>
            Opportunities
          </Link>

          <Link style={{ textDecoration: "none" }} to={ROUTES.USERS}>
            Users
          </Link>

          <Link style={{ textDecoration: "none" }} to={ROUTES.CONNECTIONS}>
            Connections
          </Link>

          <Link style={{ textDecoration: "none" }} to={ROUTES.BANDS}>
            Bands
          </Link>

          <Link style={{ textDecoration: "none" }} to={ROUTES.NOTIFICATIONS}>
            Notifications
          </Link>

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
