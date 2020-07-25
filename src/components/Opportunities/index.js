import Opportunities from './Opportunities';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";


const OpportunityPage = () => (
  <div>
    <Opportunities />
    
  </div>
);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(OpportunityPage);