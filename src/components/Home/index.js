import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Posts from '../Timeline';
import homeStyle from "./styles";

//import page_styles_template from '../StyleTemplate';

import { View, Text } from "react-native-web";

const HomePage = () => (
  <View style={homeStyle.whole_page}>
    <Text style={homeStyle.header}>Timeline</Text>
    <Posts />
  </View>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);


{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}