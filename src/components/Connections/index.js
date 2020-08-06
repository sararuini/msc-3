
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {ConnectionRequestItem} from './ConnectionRequestItem';
//import {ConnectionRequests} from './ConnectionRequests';

import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
} from "../Session";



const ConnectionPage = () => (
    <div>
      Your Connection Requests
       {/*<ConnectionRequests /> */}
      
    </div>
  );
  const condition = (authUser) => !!authUser;
  
  export default compose(
    withEmailVerification,
    withAuthorization(condition)
  )(ConnectionPage);