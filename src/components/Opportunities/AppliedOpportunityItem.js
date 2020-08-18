import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class AppliedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: "",
      contact: "",
      description: "",
      jobType: "",
      jobTags: "",
      location: "",
      salary: "",
      startingDate: "",
      createdBy: "",
      opportunityCreator: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadAppliedOpportunity();
    this.retrieveUsername();
    this.setState({ loading: false });
  }
  
  componentWillUnmount () {
    const thisOpp = this.props.appliedOpportunity.uid;
    this.props.firebase.opportunity(thisOpp).off();
  }
  retrieveUsername = () => {
    const opp = this.props.appliedOpportunity.uid;
    console.log("usernameeee " + opp)
    console.log("opp " + opp);
    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const createdBy = oppObj.createdBy;
      console.log("createdBy" + createdBy)
      console.log("creadteb by " + createdBy);
      this.props.firebase.user(createdBy).once("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        console.log("username: "+ userUsername)
        this.setState({ opportunityCreator: userUsername });
      });
    });
  };

  loadAppliedOpportunity = () => {
    const opp = this.props.appliedOpportunity.uid;
    
        this.props.firebase
          .opportunity(opp)
          .once("value", (snapshot) => {

            const oppObj = snapshot.val();
            const title = oppObj.title;
            const contact = oppObj.contact;
            const description = oppObj.description;
            const jobType = oppObj.jobType;
            const jobTags = oppObj.jobTags;
            const location = oppObj.location;
            const salary = oppObj.salary;
            const createdBy = oppObj.createdBy;
            const startingDate = oppObj.startingDate;

            this.setState({
              title: title,
              contact: contact,
              description: description,
              jobType: jobType,
              jobTags: jobTags,
              location: location,
              salary: salary,
              startingDate: startingDate,
              createdBy: createdBy,
            });
          });
  }

  render() {
    const { authUser, appliedOpportunity } = this.props;

    const {
      title,
      contact,
      description,
      jobType,
      jobTags,
      location,
      salary,
      startingDate,
      createdBy,
      opportunityCreator
    } = this.state;

    return (
      <div>
        {authUser && (
          <span>
            <label>Created by: </label>
            <Link
                  to={{
                    pathname: `${ROUTES.USERS}/${createdBy}`,
                  }}
                > 
              <strong>{opportunityCreator}</strong>
                </Link>
            <ul> Opportunity code: {appliedOpportunity.uid} </ul>
            <ul> Title: {title}</ul>
            <ul> Contact Details: {contact}</ul>
            <ul> Description: {description}</ul>
            <ul> Job Type: {jobType} </ul>
            <ul> Job Tags: {jobTags}</ul>
            <ul> Location: {location}</ul>
            <ul> Salary: {salary} </ul>
            <ul> Starting Date: {startingDate}</ul>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(AppliedOpportunityItem);
