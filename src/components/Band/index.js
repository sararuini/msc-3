import React from 'react';
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { Switch, Route, Link } from "react-router-dom";
import BandProfile from "./BandProfile";
import EditBand from "./EditBand";

import Bands from "./Bands";
import * as ROUTES from '../../constants/routes';

const BandPage = () => (
    <div>
      <Switch>
      <Route exact path={ROUTES.BANDS} component={Bands} />
      <Route exact path={ROUTES.BAND} component={BandProfile} />
      <Route exact path={ROUTES.BAND_EDIT} component={EditBand} />
    </Switch>
    </div>
  );
  const condition = (authUser) => !!authUser;
  
  export default compose(
    withEmailVerification,
    withAuthorization(condition)
  )(BandPage);