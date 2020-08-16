import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import OpportunityItem from "./OpportunityItem";

class SavedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount () {
    this.setState({loading: true})
    this.setState({loading: false})
  }

  render() {
    const {
      authUser,
      savedOpportunity,
    } = this.props;

    return (
      <div>
        {authUser && (
          <span>
            <ul> Opportunity code: {savedOpportunity.uid} </ul>
            <ul> Title: {savedOpportunity.title}</ul>
            <ul> Contact Details: {savedOpportunity.contact}</ul>
            <ul> Description: {savedOpportunity.description}</ul>
            <ul> Job Type: {savedOpportunity.jobType} </ul>
            <ul> Job Tags: {savedOpportunity.jobTags}</ul>
            <ul> Location: {savedOpportunity.location}</ul>
            <ul> Salary: {savedOpportunity.salary} </ul>
            <ul> Starting Date: {savedOpportunity.startingDate}</ul>
         </span>
        )}
      </div>
    );
  }
}

export default withFirebase(SavedOpportunityItem);
