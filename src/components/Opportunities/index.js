import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification,
} from "../Session";
import * as ROUTES from '../../constants/routes';
import Opportunities from "./Opportunities";
import SavedOpportunities from "./SavedOpportunities";
import AppliedOpportunities from "./AppliedOpportunities";
import CreatedOpportunities from "./CreatedOpportunities";
import OpportunityItem from "./OpportunityItem";


const OpportunityPage = () => (
  <div>
    <Switch>
    <Route exact path={ROUTES.OPPORTUNITIES} component={Opportunities} />
      <Route exact path={ROUTES.OPPORTUNITIES_SAVED} component={SavedOpportunities} />
      <Route exact path={ROUTES.OPPORTUNITIES_APPLIED} component={AppliedOpportunities} />
      <Route exact path={ROUTES.OPPORTUNITIES_CREATED} component={CreatedOpportunities} />
      <Route exact path={ROUTES.OPPORTUNITY} component={OpportunityItem} />
    </Switch>
    
  </div>
);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(OpportunityPage);

/*
<Link
      to={{
        pathname: `${ROUTES.OPPORTUNITIES_SAVED}`,
      }}
    > Saved Opportunities
    </Link>
    <Link
      to={{
        pathname: `${ROUTES.OPPORTUNITIES_APPLIED}`,
      }}
    > Applied Opportunities
    </Link>
    <Link
      to={{
        pathname: `${ROUTES.OPPORTUNITIES_CREATED}`,
      }}
    > Created Opportunities
    </Link>
    
     
*/