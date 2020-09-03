import React from "react";
import { Text, View} from "react-native-web";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withFirebase } from "../Firebase";
import buttonStyle from "./styles";

const SignOutButton = ({ firebase }) => (
      <button type="button" onClick={firebase.doSignOut} >
    <View style={buttonStyle.align_icon}>

    <ExitToAppIcon />
    <Text style={{
          textDecoration: "none",
          color: "black",
          fontSize: "14px",
          fontFamily: "monospace",
          fontWeigh: "bold",
          marginLeft: "2px"
        }}>
       SIGN OUT
    </Text>
    </View>
   
  </button>
  
);

export default withFirebase(SignOutButton);