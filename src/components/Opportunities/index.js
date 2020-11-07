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
import RecommendedOpportunities from "./RecommendedOpportunities";
import OpportunitiesAvailable from "./OpportunitiesAvailable";
import OpportunityItem from "./OpportunityItem";
import OpportunityProfile from "./OpportunityProfile";
import { View } from "react-native-web";
import opportunityStyle from "./styles";
import {
  BsPlusSquare,
  BsPersonFill,
  BsFillTagFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { MdDescription, MdLocationOn } from "react-icons/md";
import { BiCalendarEvent, BiCalendarWeek } from "react-icons/bi";
import { GrContact, GrMoney, GrDocumentUser} from "react-icons/gr";
import {FaSave, FaSuitcase} from "react-icons/fa";
import {CgUserList } from "react-icons/cg";
const OpportunityPage = () => (
  <div>
    <View style={opportunityStyle.main}>
      <Switch>
    <Route exact path={ROUTES.OPPORTUNITIES} component={Opportunities} />
    <Route exact path={ROUTES.OPPORTUNITIES_RECOMMENDED} component={RecommendedOpportunities} />
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