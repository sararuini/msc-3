import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class OpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*
      editMode: false,
      editTitle: this.props.opportunity.title,
      editDescription: this.props.opportunity.description,
      editLocation: this.props.opportunity.location,
      editJobType: this.props.opportunity.jobType,
      editSalary: this.props.opportunity.salary,
      editJobTags: this.props.opportunity.jobTags,
      editStartingDate: this.props.opportunity.startingDate,
      editContact: this.props.opportunity.contact,
      */
      savedAt: "",
      appliedAt: "",
      appliedOpportunity: false,
      createdBy: "",
      opportunityKey: "",
      opportunityCreator: "",
      hasApplied: false,
      hasSaved: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;
        // check for existing applied opportunities
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
                if (appliedOpportunityObj.hasOwnProperty(appliedOpportunityId)) {
                  this.setState({ hasApplied: true });
                  console.log("has saved" + appliedOpportunityId);
                }
              }
            }
          });

      }
      this.retrieveUsername();
    });
  }

  /*
  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.props.opportunity.title,
      editDescription: this.props.opportunity.description,
      editLocation: this.props.opportunity.location,
      editJobType: this.props.opportunity.jobType,
      editSalary: this.props.opportunity.salary,
      editJobTags: this.props.opportunity.jobTags,
      editStartingDate: this.props.opportunity.startingDate,
      editContact: this.props.opportunity.contact,
    }));
  };

  onChangeEdit = (event) => {
    if (event.target.name !== "editSavedOpportunity") {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  onSaveEdit = () => {
    this.props.onEditOpportunity(this.props.opportunity, this.state.editTitle);
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editDescription
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editLocation
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editJobTags
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editJobType
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editContact
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editStartingDate
    );
    this.props.onEditOpportunity(this.props.opportunity, this.state.editSalary);

    this.setState({ editMode: false });
  };
  */
  

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
        this.props.firebase
          .userAppliedOpportunity(userUid, uid)
          .set({
            appliedAt: this.props.firebase.serverValue.TIMESTAMP,
          });
        this.props.firebase.appliedOpportunity(uid).set({
          [userUid]: true,
        });
     }

      this.setState({ hasApplied: true });
    });
  };
  

  /*
  onRemoveApplicationToOpportunity = (uid) => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userUid = currentUser.uid;
        console.log("not applied " + uid);
        this.props.firebase.userAppliedOpportunity(userUid, uid).remove();

        this.props.firebase.appliedOpportunity(uid).set({
          [userUid]: false,
        });
      }
      this.setState({ hasApplied: false });
    });
  };
  */

  retrieveUsername = () => {
    const opp = this.props.opportunity.uid;
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
    const { authUser, opportunity, onRemoveOpportunity } = this.props;
    const {
      editMode,
      editTitle,
      editDescription,
      editLocation,
      editJobType,
      editSalary,
      editJobTags,
      editStartingDate,
      editContact,
      hasApplied,
      hasSaved,
      opportunityCreator,
    } = this.state;

    const isInvalid =
      editTitle === "" ||
      editLocation === "" ||
      editContact === "" ||
      editJobType === "";

    return (
      <li>
        {/*
        {editMode && (
          <div>
            <form>
              <input
                type="text"
                value={editTitle}
                name="editTitle"
                placeholder="Opportunity title"
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                placeholder="Opportunity description"
                name="editDescription"
                value={editDescription}
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editLocation"
                value={editLocation}
                placeholder="Location"
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editJobType"
                placeholder="Job Type e.g.(Full-time, Part-time, Commission, Freelancer, One-Off...)"
                value={editJobType}
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editJobTags"
                placeholder="Job Tags e.g.(Music Publishing, London, etc.)"
                value={editJobTags}
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editStartingDate"
                value={editStartingDate}
                placeholder="Starting Date"
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editContact"
                value={editContact}
                placeholder="Contact Details to Apply to opportunity"
                onChange={this.onChangeEdit}
              />

              <input
                type="text"
                name="editSalary"
                value={editSalary}
                placeholder="Salary"
                onChange={this.onChangeEdit}
              />
            </form>
          </div>
        )}
        */}
      
        {/*
        {!editMode &&(<span>
          <ul>

          </ul>
          <label>Created by: </label>
            <Link
                  to={{
                    pathname: `${ROUTES.USERS}/${opportunity.createdBy}`,
                  }}
                > 
              <strong>{opportunityCreator}</strong>
          </Link>
                
             

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
        )}
        */}
              

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
                }
              }
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
      {/*
      {authUser.uid !== opportunity.createdBy && hasApplied === true && (
          <span>
            <button
              onClick={() => {
              
                  this.onRemoveApplicationToOpportunity(opportunity.uid);
                }
              }
            >
              Remove Application to Opportunity
            </button>
          </span>
        )}
      */}
        

       

        {/*
        {authUser.uid === opportunity.createdBy && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEdit} disabled={isInvalid}>
                  Save
                </button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveOpportunity(opportunity.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}

            */}
      </li>
    );
  }
}

export default withFirebase(OpportunityItem);
