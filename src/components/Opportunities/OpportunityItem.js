import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import { View, Text } from "react-native-web";

import { Link } from "react-router-dom";
import Select from "react-select";
import { MdLocationOn, MdWork} from "react-icons/md";
import opportunityStyle from "./styles";

import {GiDrum } from "react-icons/gi";

import * as ROUTES from "../../constants/routes";

let options = [];

class OpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: "",
      location: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("Opportunity Item" + this.props.opportunity.uid);
    this.retrieveOppInfo();
    this.setState({ loading: false });
  }

  retrieveOppInfo = () => {
    const oppId = this.props.opportunity.uid;

    this.props.firebase.opportunity(oppId).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      this.setState({
        title: oppObj.title,
        description: oppObj.description,
        location: oppObj.location,
      });
    });
  };

  render() {
    const { authUser, opportunity } = this.props;
    const { loading, title, location } = this.state;

    return (
      <View style={opportunityStyle.list_opps}>
        
        <Link
          to={{
            pathname: `${ROUTES.OPPORTUNITIES}/${opportunity.uid}/profile`,
          }}
        >
          <Text style={opportunityStyle.header}>{title}</Text>

        </Link>
      </View>
    );
  }
}

export default withFirebase(OpportunityItem);
