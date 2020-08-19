import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

class OpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedAt: "",
      appliedAt: "",
      createdBy: "",
      opportunityCreator: "",
      hasApplied: false,
      hasSaved: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true})
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;
        // check for existing applied and saved opportunities
        this.props.firebase
          .userSavedOpportunities(currentUserId)
          .once("value")
          .then((snapshot) => {
            const savedOpportunityObj = snapshot.val();
            if (savedOpportunityObj) {
              for (const savedOpportunityId in savedOpportunityObj) {
                if (savedOpportunityObj.hasOwnProperty(savedOpportunityId)) {
                  this.setState({ hasSaved: true });
                  console.log("has saved" + savedOpportunityId);
                }
              }
            }
          });

        this.props.firebase
          .userAppliedOpportunities(currentUserId)
          .once("value")
          .then((snapshot) => {
            const appliedOpportunityObj = snapshot.val();
            if (appliedOpportunityObj) {
              for (const appliedOpportunityId in appliedOpportunityObj) {
                if (
                  appliedOpportunityObj.hasOwnProperty(appliedOpportunityId)
                ) {
                  this.setState({ hasApplied: true });
                  console.log("has saved" + appliedOpportunityId);
                }
              }
            }
          });
      }
      
      this.retrieveUsername();
      this.setState({loading: false})
    });
  }

  retrieveUsername = () => {
    const opp = this.props.opportunity.uid;
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


  onSaveOpportunity = (uid) => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userUid = currentUser.uid;
        console.log("saved 1 " + uid);

        const oppReference = this.props.firebase.userSavedOpportunity(
          userUid,
          uid
        );
        oppReference.set({
          savedAt: this.props.firebase.serverValue.TIMESTAMP,
          saved: true,
        });

        this.props.firebase.savedOpportunity(uid).set({
          [userUid]: true,
        });

        console.log("saved 2");
        this.setState({ hasSaved: true });
      }
    });
  };

  onUnsaveOpportunity = (uid) => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userUid = currentUser.uid;
        console.log("unsaved " + uid);
        this.props.firebase.userSavedOpportunity(userUid, uid).remove();
        this.props.firebase.savedOpportunity(uid).set({
          [userUid]: false,
        });
      }
      this.setState({ hasSaved: false });
    });
  };

  onApplyToOpportunity = (uid) => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userUid = currentUser.uid;
        console.log("applied " + uid);
        this.props.firebase.userAppliedOpportunity(userUid, uid).set({
          appliedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
        this.props.firebase.appliedOpportunity(uid).set({
          [userUid]: true,
        });
      }

      this.setState({ hasApplied: true });
    });
  };


  render() {
    const { authUser, opportunity,  } = this.props;
    const { hasApplied, hasSaved, opportunityCreator } = this.state;

    return (
      <li>

        <span>
          <ul>
            <label>Title: </label>
            {opportunity.title}
          </ul>
          <ul>
            <label> Description:</label>
            {opportunity.description}
          </ul>
          <ul>
            <label>Location: </label>
            {opportunity.location}
          </ul>
          <ul>
            <label>Job Type: </label>
            {opportunity.jobType}
          </ul>
          <ul>
            <label>Contact: </label> {opportunity.contact}
          </ul>
          <ul>
            <label>Tags: </label>
            {opportunity.jobTags}
          </ul>
          <ul>
            <label>Salary: </label>
            {opportunity.salary}
          </ul>
          <ul>
            <label>Starting Date:</label>
            {opportunity.startingDate}
          </ul>
          <ul>
            <label>Opportunity Code:</label>
            {opportunity.uid}
          </ul>

          {opportunity.editedAt && <span>(Edited)</span>}
        </span>

        {authUser.uid !== opportunity.createdBy && hasSaved === true && (
          <span>
            <button
              onClick={() => {
                this.onUnsaveOpportunity(opportunity.uid);
              }}
            >
              Unsave Opportunity
            </button>
          </span>
        )}

        {authUser.uid !== opportunity.createdBy && hasSaved === false && (
          <span>
            <button
              onClick={() => {
                this.onSaveOpportunity(opportunity.uid);
              }}
            >
              Save Opportunity
            </button>
          </span>
        )}

        {authUser.uid !== opportunity.createdBy && hasApplied === false && (
          <span>
            <button
              onClick={() => {
                this.onApplyToOpportunity(opportunity.uid);
              }}
            >
              Apply to Opportunity
            </button>
          </span>
        )}

      </li>
    );
  }
}

export default withFirebase(OpportunityItem);
