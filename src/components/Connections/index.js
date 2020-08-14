import React from 'react';
import ConnectionRequests from './ConnectionRequests';
import UserConnections from './UserConnections'
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const ConnectionPage = () => (
    <div>
      Your connection requests
       <ConnectionRequests />

       Your user connections
       <UserConnections />
      
    </div>
  );
  const condition = (authUser) => !!authUser;
  
  export default compose(
    withEmailVerification,
    withAuthorization(condition)
  )(ConnectionPage);