import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";
import Select from "react-select";

import * as ROUTES from "../../constants/routes";

let options = [];

class OpportunityProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedAt: "",
      appliedAt: "",
      createdBy: "",
      opportunityCreator: "",
      hasApplied: false,
      hasAppliedBand: false,
      hasSaved: false,
      loading: false,
      applicationText: "",
      applicationTextBand: "",
      selectedBand: "",
      userId: null,
      opportunityId: null,
      contact: "",
      createdAt: "",
      description: "",
      jobTags: "",
      jobType: "",
      location: "",
      salary: "",
      startingDate: "",
      title: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadOpportunity();
    this.retrieveUsername();
    this.setState({ loading: false });
  }

  

  loadOpportunity = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;
        const oppId = this.props.match.params.id;
        this.setState({
            opportunityId: oppId,
        })

        this.props.firebase.opportunity(oppId).once("value", (snapshot) => {
          const opportunityObj = snapshot.val();
          this.setState({
            contact: opportunityObj.contact,
            createdAt: opportunityObj.createdAt,
            description: opportunityObj.description,
            jobTags: opportunityObj.jobTags,
            jobType: opportunityObj.jobType,
            location: opportunityObj.location,
            salary: opportunityObj.salary,
            startingDate: opportunityObj.startingDate,
            title: opportunityObj.title,
            createdBy: opportunityObj.createdBy
          });
        });

        // check for existing applied and saved opportunities
        this.props.firebase
          .userSavedOpportunity(currentUserId, oppId )
          .once("value")
          .then((snapshot) => {
            const savedOpportunityObj = snapshot.val();

            if (savedOpportunityObj){
                this.setState({ hasSaved: true });
            } else {
                this.setState({ hasSaved: false });
            }
          });

        this.props.firebase
          .userAppliedOpportunity(currentUserId, oppId)
          .once("value")
          .then((snapshot) => {
              
            const appliedOpportunityObj = snapshot.val();

            if (appliedOpportunityObj){
                this.setState({ hasApplied: true });
            } else {
                this.setState({ hasApplied: false });
            }
          });

        this.props.firebase
          .userBands(currentUserId)
          .once("value", (snapshot) => {
            const bandObj = snapshot.val();

            if (bandObj) {
              for (let bandId in bandObj) {
                if (bandObj.hasOwnProperty(bandId)) {
                  this.props.firebase.band(bandId).once("value", (snap) => {
                    const bandInfoObj = snap.val();
                    const bandName = bandInfoObj.name;
                    console.log("name " + bandName);
                    const bandObject = {
                      value: [bandName],
                      label: [bandName],
                    };
                    if (options.includes(bandObject)) {
                      console.log("included");
                    } else {
                      options.push(bandObject);
                    }
                  });
                }
              }
            }
          });
      }
    });
  };

  retrieveUsername = () => {
    const opp = this.props.match.params.id;

    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const createdBy = oppObj.createdBy;
      this.props.firebase.user(createdBy).once("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        this.setState({
          opportunityCreator: userUsername,
          createdBy: createdBy,
        });
      });
    });
  };

  onSaveOpportunity = (uid) => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userUid = currentUser.uid;

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

        this.setState({ hasSaved: true });
      }
    });
  };

  onUnsaveOpportunity = (uid) => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userUid = currentUser.uid;
        this.props.firebase.userSavedOpportunity(userUid, uid).remove();
        this.props.firebase.savedOpportunity(uid).set({
          [userUid]: false,
        });
      }
      this.setState({ hasSaved: false });
    });
  };

  componentWillUnmount (){
    const oppId = this.props.match.params.id;
    this.props.firebase.opportunity(oppId).off();
  }

  onApplyToOpportunity = (uid) => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userUid = currentUser.uid;

        this.props.firebase.userAppliedOpportunity(userUid, uid).set({
          appliedAt: this.props.firebase.serverValue.TIMESTAMP,
          applicationText: this.state.applicationText,
        });
        this.props.firebase.appliedOpportunity(uid).set({
          [userUid]: true,
        });
      }

      this.setState({ hasApplied: true });
    });
  };
  /*
  onApplyToOpportunityBand = (uid) => {
    const band = this.state.selectedBand;
    console.log("baaaand " + band)

    this.props.firebase.bandAppliedOpportunity(band, uid).set({
      appliedAt: this.props.firebase.serverValue.TIMESTAMP,
      applicationTextBand: this.state.applicationTextBand,
    });

    this.props.firebase.appliedOpportunity(band).set({
      band: true,
    });

    this.setState({ hasApplied: true });
   
  };
   */

  onChangeApplicationText = (event) => {
    this.setState({ applicationText: event.target.value });
  };

  onChangeApplicationTextBand = (event) => {
    this.setState({ applicationTextBand: event.target.value });
  };

  handleChange = (event) => {
    this.setState({ selectedBand: event.target.value });
    console.log("selected band " + this.state.selectedBand);
  };

  render() {
    const { authUser } = this.props;
    const {
      hasApplied,
      hasSaved,
      opportunityCreator,
      createdBy,
      applicationText,
      hasAppliedBand,
      applicationTextBand,
      selectedBand,
      contact,
      description,
      jobTags,
      jobType,
      location,
      salary,
      startingDate,
      title,
      opportunityId,
      createdAt
      
    } = this.state;

    //const isInvalidBand = applicationTextBand === "";
    const isInvalid = applicationText === "";
    //const value = selectedBand && selectedBand.value;

    return (
      <li>
        <span>
          <ul>
            Created by:
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${createdBy}`,
              }}
            >
              {opportunityCreator}
            </Link>
          </ul>
          <ul>
            <label>Title: </label>
            {title}
          </ul>
          <ul>
            <label> Description:</label>
            {description}
          </ul>
          <ul>
            <label>Location: </label>
            {location}
          </ul>
          <ul>
            <label>Job Type: </label>
            {jobType}
          </ul>
          <ul>
            <label>Contact: </label> {contact}
          </ul>
          <ul>
            <label>Tags: </label>
            {jobTags}
          </ul>
          <ul>
            <label>Salary: </label>
            {salary}
          </ul>
          <ul>
            <label>Starting Date:</label>
            {startingDate}
          </ul>
          <ul>
            <label>Opportunity Code:</label>
            {opportunityId}
          </ul>
        </span>

        {opportunityId !== createdBy && hasSaved === true && (
          <span>
            <button
              onClick={() => {
                this.onUnsaveOpportunity(opportunityId);
              }}
            >
              Unsave Opportunity
            </button>
          </span>
        )}

        {opportunityId !== createdBy && hasSaved === false && (
          <span>
            <button
              onClick={() => {
                this.onSaveOpportunity(opportunityId);
              }}
            >
              Save Opportunity
            </button>
          </span>
        )}

        {opportunityId !== createdBy && !hasApplied && (
          <span>
            <form
              onSubmit={() => {
                this.onApplyToOpportunity(opportunityId);
              }}
            >
              <input
                type="text"
                value={applicationText}
                onChange={this.onChangeApplicationText}
              />

              <button disabled={isInvalid} type="submit">
                Send Application
              </button>
            </form>
          </span>
        )}

        {/*
        {authUser.uid !== opportunity.createdBy && !hasAppliedBand && (
          <span>
            <form
              onSubmit={() => {
                this.onApplyToOpportunityBand(opportunity.uid);
              }}
            >
              <Select
                value={selectedBand}
                options={options}
                onChange={this.handleChange}
              />

              <input
                type="text"
                value={applicationTextBand}
                onChange={this.onChangeApplicationTextBand}
              />

              <button disabled={isInvalidBand} type="submit">
                Send Application as band
              </button>
            </form>
          </span>
          
        )} 
        */}
      </li>
    );
  }
}

export default withFirebase(OpportunityProfile);