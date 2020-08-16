import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class AppliedOpportunityItem extends Component {
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
      appliedOpportunity,
    } = this.props;

    return (
      <div>
        {authUser && (
          <span>
            <ul> Opportunity code: {appliedOpportunity.uid} </ul>
            <ul> Title: {appliedOpportunity.title}</ul>
            <ul> Contact Details: {appliedOpportunity.contact}</ul>
            <ul> Description: {appliedOpportunity.description}</ul>
            <ul> Job Type: {appliedOpportunity.jobType} </ul>
            <ul> Job Tags: {appliedOpportunity.jobTags}</ul>
            <ul> Location: {appliedOpportunity.location}</ul>
            <ul> Salary: {appliedOpportunity.salary} </ul>
            <ul> Starting Date: {appliedOpportunity.startingDate}</ul>
         </span>
        )}
      </div>
    );
  }
}

export default withFirebase(AppliedOpportunityItem);
