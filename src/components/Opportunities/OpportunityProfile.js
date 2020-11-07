import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";
import Select from "react-select";
import { View, Text } from "react-native-web";
import opportunityStyle from "./styles";
import * as ROUTES from "../../constants/routes";


import {
  BsPlusSquare,
  BsPersonFill,
  BsFillTagFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { MdDescription, MdLocationOn } from "react-icons/md";
import { BiCalendarEvent, BiCalendarWeek, BiNotification, BiMailSend} from "react-icons/bi";
import { GrContact, GrMoney, GrDocumentUser} from "react-icons/gr";

import {FaSave, FaSuitcase, FaHashtag, FaHeart, FaRegHeart } from "react-icons/fa";
import {CgUserList } from "react-icons/cg";

let options = [];

class OpportunityProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedAt: "",
      appliedAt: "",
      createdBy: "",
      company: "",
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
      company,
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
              <Text style={opportunityStyle.normal_text}>{opportunityCreator}</Text>
            </Link>
            <View style={opportunityStyle.align_icon}>
              <BsPersonFill />
                <Text style={opportunityStyle.header}>Position advertised:</Text>
            <Text style={opportunityStyle.normal_text}>{position}</Text>
            </View>

            <View style={opportunityStyle.align_icon}>
            <FaSuitcase />
          <Text style={opportunityStyle.header}>Company/ Person advertising:</Text>
            <Text style={opportunityStyle.normal_text}>{company}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
          <MdDescription />         
          <Text style={opportunityStyle.header}>Description:</Text>
            <Text style={opportunityStyle.normal_text}>{description}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
          <MdLocationOn />

          <Text style={opportunityStyle.header}>Location:</Text>
            <Text style={opportunityStyle.normal_text}>{location}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
          <BiCalendarWeek />

          <Text style={opportunityStyle.header}>Job Type:</Text>
            <Text style={opportunityStyle.normal_text}>{jobType}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <GrContact />

          <Text style={opportunityStyle.header}>Contact:</Text>
            <Text style={opportunityStyle.normal_text}>{contact}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <BsFillTagFill />

          <Text style={opportunityStyle.header}>Job Tags:</Text>
            <Text style={opportunityStyle.normal_text}>{jobTags}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <BsFillPersonLinesFill />

          <Text style={opportunityStyle.header}>Skills Required:</Text>
            <Text style={opportunityStyle.normal_text}>{skills}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <GrMoney />

          <Text style={opportunityStyle.header}>Salary:</Text>
            <Text style={opportunityStyle.normal_text}>{salary}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
            <BiCalendarEvent />

          <Text style={opportunityStyle.header}>Starting Date:</Text>

            <Text style={opportunityStyle.normal_text}>{startingDate}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
            <FaHashtag />
            <Text style={opportunityStyle.header}>Opportunity Code:</Text>
            <Text style={opportunityStyle.normal_text}>{opportunityId}</Text>
          </View>
            </ul>
          </View>

          {currentUserId !== createdBy && hasSaved === true && (
            <View style={opportunityStyle.align_icon}>
              <button
                onClick={() => {
                  this.onUnsaveOpportunity(opportunityId);
                }}
              >
                <FaRegHeart />
                Unsave Opportunity
              </button>
            </View>
          )}

          {currentUserId !== createdBy && hasSaved === false && (
            <View style={opportunityStyle.align_icon}>
              <button
                onClick={() => {
                  this.onSaveOpportunity(opportunityId);
                }}
              >
                <FaHeart />
                Save Opportunity
              </button>
            </View>
          )}

          {currentUserId !== createdBy && !hasApplied && (
            <View style={opportunityStyle.align_icon}>
              <form
                onSubmit={() => {
                  this.onApplyToOpportunity(opportunityId);
                }}
              >
                <Text style={opportunityStyle.normal_text}>Write your application message here: </Text>

                <input
                  type="text"
                  value={applicationText}
                  placeholder="Application message"
                  onChange={this.onChangeApplicationText}
                />

                <button disabled={isInvalid} type="submit">

                  <BiMailSend />
                  Send Application
                </button>
              </form>
            </View>
          )}
      </div>
    );
  }
}

export default withFirebase(OpportunityProfile);
