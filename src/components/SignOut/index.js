import React from "react";
import { View, Button } from "react-native-web";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withFirebase } from "../Firebase";
import buttonStyle from "./styles";

const SignOutButton = ({ firebase }) => (
      <button type="button" onClick={firebase.doSignOut} >
  
    <ExitToAppIcon />
    Sign Out
  </button>
  
);

export default withFirebase(SignOutButton);
