import React, { Component } from "react";

import { Link } from "react-router-dom";
import { View, Text } from "react-native-web";
import opportunityStyle from "./styles";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class AppliedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      position: "",
      contact: "",
      skills: "",
      description: "",
      jobType: "",
      jobTags: "",
      location: "",
      salary: "",
      startingDate: "",
      createdBy: "",
      opportunityCreator: "",
      statusMessage: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("applied opportunity " + this.props.appliedOpportunity.uid)
    this.loadAppliedOpportunity();
    this.retrieveUsername();
    this.retrieveStatus()
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    const thisOpp = this.props.appliedOpportunity.uid;
    this.props.firebase.opportunity(thisOpp).off();
  }

  retrieveUsername = () => {
    const opp = this.props.appliedOpportunity.uid;
    console.log("usernameeee " + opp);
    console.log("opp " + opp);
    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const createdBy = oppObj.createdBy;
      console.log("createdBy" + createdBy);
      console.log("creadteb by " + createdBy);
      this.props.firebase.user(createdBy).once("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        console.log("username: " + userUsername);
        this.setState({ opportunityCreator: userUsername });
      });
    });
  };

  retrieveStatus = () => {
    const opp = this.props.appliedOpportunity.uid;
    const user = this.props.authUser.uid;
    this.props.firebase
      .userAppliedOpportunity(user, opp)
      .once("value", (snapshot) => {
        const message = snapshot.val().statusMessage;

        this.setState({
          statusMessage: message,
        });
      });
      console.log("status " + this.state.statusMessage)
  };

  loadAppliedOpportunity = () => {
    const opp = this.props.appliedOpportunity.uid;

    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const position = oppObj.position;
      const skills = oppObj.skills;
      const contact = oppObj.contact;
      const description = oppObj.description;
      const jobType = oppObj.jobType;
      const jobTags = oppObj.jobTags;
      const location = oppObj.location;
      const salary = oppObj.salary;
      const createdBy = oppObj.createdBy;
      const startingDate = oppObj.startingDate;

      this.setState({
        position: position,
        contact: contact,
        description: description,
        jobType: jobType,
        jobTags: jobTags,
        location: location,
        salary: salary,
        startingDate: startingDate,
        createdBy: createdBy,
        skills:skills,
      });
    });
  };

  render() {
    const { authUser, appliedOpportunity } = this.props;

    const {
      position,
      skills,
      contact,
      description,
      jobType,
      jobTags,
      location,
      salary,
      startingDate,
      createdBy,
      opportunityCreator,
      statusMessage,
    } = this.state;

    return (
      <div>
        {authUser && (
          <span>
            <ul>
            <Text style={opportunityStyle.normal_text}>Created by: </Text>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${createdBy}`,
              }}
            >
              <Text style={opportunityStyle.normal_text}>{opportunityCreator}</Text>
            </Link>
            </ul>
            <ul>
          <Text style={opportunityStyle.header}>Position advertised:</Text>
            <Text style={opportunityStyle.normal_text}>{position}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Description:</Text>
            <Text style={opportunityStyle.normal_text}>{description}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Location:</Text>
            <Text style={opportunityStyle.normal_text}>{location}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Job Type:</Text>
            <Text style={opportunityStyle.normal_text}>{jobType}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Contact:</Text>
            <Text style={opportunityStyle.normal_text}>{contact}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Job Tags:</Text>
            <Text style={opportunityStyle.normal_text}>{jobTags}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Skills Required:</Text>
            <Text style={opportunityStyle.normal_text}>{skills}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Salary:</Text>
            <Text style={opportunityStyle.normal_text}>{salary}</Text>
          </ul>
          <ul>
          <Text style={opportunityStyle.header}>Starting Date:</Text>
            <Text style={opportunityStyle.normal_text}>{startingDate}</Text>
          </ul>
          <ul>
            <Text style={opportunityStyle.header}>Opportunity Code:</Text>
            <Text style={opportunityStyle.normal_text}>{appliedOpportunity.uid}</Text>
          </ul>
          </span>
        )}
        {statusMessage === "" && (
           <Text style={opportunityStyle.normal_text}>There is no application status message</Text>
        )}

        {statusMessage && (
          <div>
            <Text style={opportunityStyle.header}>Application Status Message:</Text> 
            <Text style={opportunityStyle.normal_text}>{statusMessage}</Text>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(AppliedOpportunityItem);
