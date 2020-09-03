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