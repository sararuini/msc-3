import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
} from "../Session";
import * as ROUTES from '../../constants/routes';
import Notifications from "./Notifications";
import NotificationProfile from "./NotificationProfile"

const NotificationPage = () => (
  <div>
    <Switch>
    <Route exact path={ROUTES.NOTIFICATIONS} component={Notifications} />
    <Route exact path={ROUTES.NOTIFICATION} component={NotificationProfile} />

    </Switch>
    
  </div>
);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(NotificationPage);