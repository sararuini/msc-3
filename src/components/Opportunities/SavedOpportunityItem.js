import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class SavedOpportunityItem extends Component {
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
    };
  }

  componentDidMount () {
    this.setState({loading: true})
    this.loadSavedOpportunity()
    this.setState({loading: false})
  }

  componentWillUnmount () {
    const thisOpp = this.props.savedOpportunity.uid;
    this.props.firebase.opportunity(thisOpp).off();
  }

  loadSavedOpportunity = () => {
    const opp = this.props.savedOpportunity.uid;
    
        this.props.firebase
          .opportunity(opp)
          .on("value", (snapshot) => {

            const oppObj = snapshot.val();
            const title = oppObj.title;
            const contact = oppObj.contact;
            const description = oppObj.description;
            const jobType = oppObj.jobType;
            const jobTags = oppObj.jobTags;
            const location = oppObj.location;
            const salary = oppObj.salary;
            const startingDate = oppObj.startingDate;
            console.log()

            this.setState({
              title: title,
              contact: contact,
              description: description,
              jobType: jobType,
              jobTags: jobTags,
              location: location,
              salary: salary,
              startingDate: startingDate,
            });
          });
  }

  render() {
    const {
      authUser,
      savedOpportunity,
    } = this.props;

    const {
      title,
      contact,
      description,
      jobType,
      jobTags,
      location,
      salary,
      startingDate,
    } = this.state;
    return (
      <div>
        {authUser && (
          <span>
            <ul> Opportunity code: {savedOpportunity.uid} </ul>
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

export default withFirebase(SavedOpportunityItem);
