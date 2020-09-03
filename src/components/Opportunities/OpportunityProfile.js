import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";
import Select from "react-select";
import { View, Text } from "react-native-web";
import opportunityStyle from "./styles";
import * as ROUTES from "../../constants/routes";

let options = [];

class OpportunityProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedAt: "",
      appliedAt: "",
      createdBy: "",
      currentUserId: "",
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
      position: "",
      skills: "",
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
          currentUserId: currentUserId,
        });
        console.log("user id " + currentUserId);
        console.log("opp id " + oppId);

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
            skills: opportunityObj.skills,
            createdBy: opportunityObj.createdBy,
            position: opportunityObj.position,
          });
        });

        // check for existing applied and saved opportunities
        this.props.firebase
          .userSavedOpportunity(currentUserId, oppId)
          .once("value")
          .then((snapshot) => {
            const savedOpportunityObj = snapshot.val();

            if (savedOpportunityObj) {
              this.setState({ hasSaved: true });
            } else {
              this.setState({ hasSaved: false });
            }
            console.log("saved state " + this.state.hasSaved);
          });

        this.props.firebase
          .userAppliedOpportunity(currentUserId, oppId)
          .once("value")
          .then((snapshot) => {
            const appliedOpportunityObj = snapshot.val();

            if (appliedOpportunityObj) {
              this.setState({ hasApplied: true });
            } else {
              this.setState({ hasApplied: false });
            }
            console.log("saved applied " + this.state.hasApplied);
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

  componentWillUnmount() {
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
      contact,
      description,
      jobTags,
      jobType,
      location,
      salary,
      startingDate,
      position,
      currentUserId,
      skills,
      opportunityId,
      createdAt,
    } = this.state;

    //const isInvalidBand = applicationTextBand === "";
    const isInvalid = applicationText === "";
    //const value = selectedBand && selectedBand.value;

    return (
      <div>
        <Link
          to={{
            pathname: `${ROUTES.OPPORTUNITIES}`,
          }}
        >
          <Text style={opportunityStyle.normal_text}>
            Go back to main opportunities page
          </Text>
        </Link>

      
          <View>
            <ul>
              <Text style={opportunityStyle.normal_text}>Created by: </Text>
              <Link
                to={{
                  pathname: `${ROUTES.USERS}/${createdBy}`,
                }}
              >
                {opportunityCreator}
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
              <Text style={opportunityStyle.normal_text}>{opportunityId}</Text>
            </ul>
          </View>

          {currentUserId !== createdBy && hasSaved === true && (
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

          {currentUserId !== createdBy && hasSaved === false && (
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

          {currentUserId !== createdBy && !hasApplied && (
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
      </div>
    );
  }
}

export default withFirebase(OpportunityProfile);
