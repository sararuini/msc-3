import React, { Component } from "react";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import { View, Text } from "react-native-web";

import { Link } from "react-router-dom";
import Select from "react-select";
import { MdLocationOn, MdDescription } from "react-icons/md";
import opportunityStyle from "./styles";

import { GiDrum } from "react-icons/gi";

import {
  BsPlusSquare,
  BsPersonFill,
  BsFillTagFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import {
  BiCalendarEvent,
  BiCalendarWeek,
  BiNotification,
} from "react-icons/bi";
import { GrContact, GrMoney, GrDocumentUser } from "react-icons/gr";
import { FaSave, FaSuitcase, FaHashtag, FaDotCircle } from "react-icons/fa";
import { CgUserList } from "react-icons/cg";
import * as ROUTES from "../../constants/routes";

let options = [];

class OpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      uid: "",
      position: "",
      company: "",
      location: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.retrieveOppInfo();
    this.setState({ loading: false });
  }

  retrieveOppInfo = () => {
    const oppId = this.props.opportunity.uid;

    console.log("opp id " + oppId)
    this.props.firebase.opportunity(oppId).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      this.setState({
        position: oppObj.position,
        company: oppObj.company,
        description: oppObj.description,
        location: oppObj.location,
        uid: oppId
      });
    });
  };

  componentWillUnmount() {
    const oppId = this.props.opportunity.uid;
    this.props.firebase.opportunity(oppId).off();
    console.log("unmount")
  }

  render() {
    const { authUser, opportunity } = this.props;
    const { loading, position, location, company, uid} = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {opportunity && !loading && (
              <View style={opportunityStyle.list_opps}>
                <Link
                  to={{
                    pathname: `${ROUTES.OPPORTUNITIES}/${uid}/profile`,
                  }}
                >
                  <View style={opportunityStyle.align_icon}>
                    <FaDotCircle />
                    <Text style={opportunityStyle.header}>{position}</Text>
                    <Text style={opportunityStyle.header}>{company}</Text>
                    <Text style={opportunityStyle.header}>{location}</Text>
                  </View>
                </Link>
              </View>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(OpportunityItem);
