import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class SavedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      position: "",
      skills: "",
      contact: "",
      description: "",
      jobType: "",
      jobTags: "",
      location: "",
      salary: "",
      startingDate: "",
      createdBy: "",
      opportunityCreator:"",
    };
  }

  componentDidMount () {
    this.setState({loading: true})
    this.loadSavedOpportunity()
    this.retrieveUsername()
    this.setState({loading: false})
  }

  componentWillUnmount () {
    const thisOpp = this.props.savedOpportunity.uid;
    this.props.firebase.opportunity(thisOpp).off();
  }

  loadSavedOpportunity = () => {
    const opp = this.props.savedOpportunity.uid;
      console.log("ooooooooopp" + opp)
        this.props.firebase
          .opportunity(opp)
          .once("value", (snapshot) => {

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
              createdBy: createdBy,
              jobType: jobType,
              jobTags: jobTags,
              location: location,
              salary: salary,
              skills: skills,
              startingDate: startingDate,
            });
          });
  }

  retrieveUsername = () => {
    const opp = this.props.savedOpportunity.uid;
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

  render() {
    const {
      authUser,
      savedOpportunity,
    } = this.props;

    const {
      position,
      skills,
      contact,
      createdBy,
      description,
      jobType,
      jobTags,
      location,
      salary,
      startingDate,
      opportunityCreator,
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
          
            <ul> Opportunity code: {savedOpportunity.uid} </ul>
            <ul> Position: {position}</ul>
            <ul> Contact Details: {contact}</ul>
            <ul> Description: {description}</ul>
            <ul> Job Type: {jobType} </ul>
            <ul> Job Tags: {jobTags}</ul>
            <ul> Location: {location}</ul>
            <ul> Skills: {skills}</ul>
            <ul> Salary: {salary} </ul>
            <ul> Starting Date: {startingDate}</ul>
         </span>
        )}
      </div>
    );
  }
}

export default withFirebase(SavedOpportunityItem);
