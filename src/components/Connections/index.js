import React from 'react';
import ConnectionRequests from './ConnectionRequests';
import UserConnections from './UserConnections'
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { Link } from 'react-router-dom';
import connectionStyle from "./styles";
import { View, Text } from "react-native-web";
import * as ROUTES from '../../constants/routes';

const ConnectionPage = () => (
    <div>
      <View>
        <Text style={connectionStyle.header}>Your connection requests</Text>
      
       <ConnectionRequests />
      </View>
      
      <View>
        <Text style={connectionStyle.header}>Your user connections</Text>
       <UserConnections />
      </View>
       
      
    </div>
  );
  const condition = (authUser) => !!authUser;
  
  export default compose(
    withEmailVerification,
    withAuthorization(condition)
  )(ConnectionPage);