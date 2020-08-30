import React from "react";
import { Switch, Route} from "react-router-dom";
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
import OpportunitiesAvailable from "./OpportunitiesAvailable";
import OpportunityItem from "./OpportunityItem";
import OpportunityProfile from "./OpportunityProfile";
import { View } from "react-native-web";
import opportunityStyle from "./styles";

const OpportunityPage = () => (
  <div>
    <View style={opportunityStyle.main}>
      <Switch>
    <Route exact path={ROUTES.OPPORTUNITIES} component={Opportunities} />
      <Route exact path={ROUTES.OPPORTUNITIES_SAVED} component={SavedOpportunities} />
      <Route exact path={ROUTES.OPPORTUNITIES_APPLIED} component={AppliedOpportunities} />
      <Route exact path={ROUTES.OPPORTUNITIES_PUBLISHED} component={CreatedOpportunities} />
      <Route exact path={ROUTES.OPPORTUNITIES_AVAILABLE} component={OpportunitiesAvailable} />
      <Route exact path={ROUTES.OPPORTUNITY} component={OpportunityItem} />
      <Route exact path={ROUTES.OPPORTUNITY_PROFILE} component={OpportunityProfile} />

    </Switch>
    </View>
    
    
  </div>
);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(OpportunityPage);