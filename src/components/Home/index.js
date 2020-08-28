import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Posts from '../Timeline';
//import page_styles_template from '../StyleTemplate';

import { View, Text } from "react-native-web";

const HomePage = () => (
  <div>
    <View></View>
    <h1>Timeline</h1>
    <Posts />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);