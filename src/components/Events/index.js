import React from 'react';
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { Switch, Route } from "react-router-dom";
import EventProfile from "./EventProfile";
import EditEvent from "./EditEvent";

import Events from "./Events";
import * as ROUTES from '../../constants/routes';

const EventPage = () => (
    <div>
      <Switch>
      <Route exact path={ROUTES.EVENTS} component={Events} />
      <Route exact path={ROUTES.EVENT} component={EventProfile} />
      <Route exact path={ROUTES.BAND_EDIT} component={EditEvent} />
    </Switch>
    </div>
  );
  const condition = (authUser) => !!authUser;
  
  export default compose(
    withEmailVerification,
    withAuthorization(condition)
  )(EventPage);