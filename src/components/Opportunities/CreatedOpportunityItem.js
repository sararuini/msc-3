import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import ApplicantList from "./ApplicantList";
import opportunityStyle from "./styles";
import { View, Text, } from "react-native-web";

import {
  BsPlusSquare,
  BsPersonFill,
  BsFillTagFill,
  BsFillPersonLinesFill,
  BsReply,
} from "react-icons/bs";
import { MdDescription, MdLocationOn } from "react-icons/md";
import { BiCalendarEvent, BiCalendarWeek, BiNotification } from "react-icons/bi";
import { GrContact, GrMoney, GrDocumentUser} from "react-icons/gr";
import {FaSave, FaSuitcase, FaHashtag, FaUsers} from "react-icons/fa";
import {CgUserList } from "react-icons/cg";

class CreatedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      limit: 5,
      editMode: false,
      editPosition: this.props.opportunityCreated.position,
      editDescription: this.props.opportunityCreated.description,
      editLocation: this.props.opportunityCreated.location,
      editJobType: this.props.opportunityCreated.jobType,
      editCompany: this.props.opportunityCreated.company,
      editSalary: this.props.opportunityCreated.salary,
      editJobTags: this.props.opportunityCreated.jobTags,
      editStartingDate: this.props.opportunityCreated.startingDate,
      editContact: this.props.opportunityCreated.contact,
      createdOpportunity: "",
      applicants: "",
      position: "",
      company: "",
      description: "",
      location: "",
      jobType: "",
      salary: "",
      jobTags: "",
      startingDate: "",
      contact: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("THIS IS LOADING CREATED OPP (CREATED OPP ITEM)");
    console.log("uid of opp loading: " + this.props.opportunityCreated.uid);

    console.log("title of opp loading: " + this.props.opportunityCreated.position);
    this.loadCreatedOpportunity();
    console.log("DONE LOADING CREATED OPP (CREATED OPP ITEM)");
    this.retrieveUsername();
    this.loadApplicants()
    this.setState({ loading: false });
  }

  retrieveUsername = () => {
    console.log("retrieving username");
    const opp = this.props.opportunityCreated.uid;
    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const createdBy = oppObj.createdBy;
      this.props.firebase.user(createdBy).once("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        this.setState({ opportunityCreator: userUsername });
      });
    });
  };

  componentWillUnmount() {
    const opp = this.props.opportunityCreated.uid;
    this.props.firebase.opportunity(opp).off()
  }

  loadCreatedOpportunity = () => {
    const thisCreatedOpportunity = this.props.opportunityCreated.uid;
    console.log("loadCreatedOpportunity start");
    console.log("this opp " + thisCreatedOpportunity);
    this.props.firebase
      .opportunity(thisCreatedOpportunity)
      .on("value", (snapshot) => {
        const createdOpportunityObject = snapshot.val();

        this.setState({ createdOpportunity: createdOpportunityObject });
       
        console.log(
          "loadCreatedOpportunity des" + createdOpportunityObject.description
        );
      });
  };
  /*
  onEditOpportunity = (
    createdOpportunity,
    title,
    description,
    contact,
    location,
    jobType,
    jobTags,
    salary,
    startingDate
  ) => {
    const { uid, ...opportunitySnapshot } = createdOpportunity;

    this.props.firebase.opportunity(this.props.opportunityCreated.uid).set({
      ...opportunitySnapshot,
      title,
      description,
      location,
      contact,
      jobType,
      jobTags,
      salary,
      startingDate,
    });
  };

  onRemoveOpportunity = (authUser, uid) => {
    this.props.firebase.opportunity(uid).remove();
    console.log("removing");
    this.props.firebase.userCreatedOpportunity(authUser.uid, uid).remove();
    console.log("removed");
  };
*/

  loadApplicants = () => {
    const thisCreatedOpportunity = this.props.opportunityCreated.uid;
    console.log("loading applicants " + thisCreatedOpportunity)

    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.props.firebase
          .appliedOpportunity(thisCreatedOpportunity)
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const appliedOpportunityObj = snapshot.val();
            console.log(appliedOpportunityObj);
            if (appliedOpportunityObj) {
              for (const appliedOpportunityId in appliedOpportunityObj) {
                if (
                  appliedOpportunityObj.hasOwnProperty(appliedOpportunityId)
                ) {
                  const appliedOpportunity =
                    appliedOpportunityObj[appliedOpportunityId];
                  console.log("appliedOpportunityId " + appliedOpportunityId);

                  const applicants = Object.keys(appliedOpportunityObj).map(
                    (key) => ({
                      ...appliedOpportunityObj[key],
                      uid: key,
                    })
                  );
                  this.setState({
                    applicants: applicants,
                    loading: false,
                  });
                }
              }
            } else {
              this.setState({ applicants: null });
            }
          });
      }
    });
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editPosition: this.state.createdOpportunity.position,
      editCompany: this.state.createdOpportunity.company,
      editSkills: this.state.createdOpportunity.skills,
      editDescription: this.state.createdOpportunity.description,
      editLocation: this.state.createdOpportunity.location,
      editJobType: this.state.createdOpportunity.jobType,
      editSalary: this.state.createdOpportunity.salary,
      editJobTags: this.state.createdOpportunity.jobTags,
      editStartingDate: this.state.createdOpportunity.startingDate,
      editContact: this.state.createdOpportunity.contact,
    }));

  };

  onChangeEdit = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("change edit event");
    console.log("event");
  };

  onSaveEdit = () => {
    this.onEditOpportunity(this.state.createdOpportunity, this.state.editSkills);

    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editDescription
    );

    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editCompany
    );

    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editLocation
    );
    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editJobTags
    );
    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editJobType
    );
    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editContact
    );
    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editStartingDate
    );
    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editSalary
    );
    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editPosition
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, opportunityCreated } = this.props;
    const {
      editMode,
      editPosition,
      editSkills,
      editCompany,
      editDescription,
      editLocation,
      editJobType,
      editSalary,
      editJobTags,
      editStartingDate,
      editContact,
      loading,
      createdOpportunity,
      opportunityCreator,
      applicants,
      //createdOpportunityObject
    } = this.state;

    const isInvalid =
      editPosition === "" ||
      editLocation === "" ||
      editContact === "" ||
      editCompany === "" ||
      editJobType === "";

    return (
      <div>
        {loading && <div>Loading ...</div>}

        {editMode && (
          <div>
            <form>
              <label> Position </label>
              <input
                type="text"
                value={editPosition}
                name="editPosition"
                onChange={this.onChangeEdit}
              />

          <label> Company/ Person advertising </label>
              <input
                type="text"
                name="editCompany"
                value={editCompany}
                onChange={this.onChangeEdit}
              />

              <label> Description </label>
              <input
                type="text"
                name="editDescription"
                value={editDescription}
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                value={editSkills}
                name="editSkills"
                onChange={this.onChangeEdit}
              />


              <label> Location </label>
              <input
                type="text"
                name="editLocation"
                value={editLocation}
                onChange={this.onChangeEdit}
              />

              <label> Job Type </label>
              <input
                type="text"
                name="editJobType"
                value={editJobType}
                onChange={this.onChangeEdit}
              />

              <label> Job Tags </label>
              <input
                type="text"
                name="editJobTags"
                value={editJobTags}
                onChange={this.onChangeEdit}
              />

              <label> Starting Date </label>
              <input
                type="text"
                name="editStartingDate"
                value={editStartingDate}
                onChange={this.onChangeEdit}
              />

              <label> Contact </label>
              <input
                type="text"
                name="editContact"
                value={editContact}
                onChange={this.onChangeEdit}
              />

              <label> Salary </label>
              <input
                type="text"
                name="editSalary"
                value={editSalary}
                onChange={this.onChangeEdit}
              />
            </form>
          </div>
        )}

        {!editMode && authUser && (
          <span>
            <View style={opportunityStyle.align_icon}>
              <BsPersonFill />
          <Text style={opportunityStyle.header}>Position advertised:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.position}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
            <FaSuitcase />
          <Text style={opportunityStyle.header}>Company/ Person advertising:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.company}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <MdDescription />
          <Text style={opportunityStyle.header}>Description:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.description}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <MdLocationOn />
          <Text style={opportunityStyle.header}>Location:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.location}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <BiCalendarWeek />
          <Text style={opportunityStyle.header}>Job Type:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.jobType}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <GrContact />
          <Text style={opportunityStyle.header}>Contact:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.contact}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <BsFillTagFill />
          <Text style={opportunityStyle.header}>Job Tags:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.jobTags}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <BsFillPersonLinesFill />
          <Text style={opportunityStyle.header}>Skills Required:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.skills}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <GrMoney />
          <Text style={opportunityStyle.header}>Salary:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.salary}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
            <BiCalendarEvent />
          <Text style={opportunityStyle.header}>Starting Date:</Text>
            <Text style={opportunityStyle.normal_text}>{createdOpportunity.startingDate}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
            <FaHashtag />
            <Text style={opportunityStyle.header}>Opportunity Code:</Text>
            <Text style={opportunityStyle.normal_text}>{opportunityCreated.uid}</Text>
          </View>
            
          </span>
        )}


        {applicants && (
          <View style={opportunityStyle.align_icon}>
            <FaUsers />
            <Text style={opportunityStyle.header}>Applicants for {createdOpportunity.position}:</Text>
            
            <ul>
              <ApplicantList authUser={authUser} applicants={applicants} opportunity={opportunityCreated.uid} />
            </ul>
            </View>
        )}

            {/*
            {!loading && applicants && (
              <Applicants />
            )}
           
            {!loading && applicants && applicants.length > 3 && (
              <button type="button" onClick={this.onNextPageApplicants}>
                More applicants
              </button>
            )}
            */}
          

        {authUser && !applicants && (
          <span>
            <Text style={opportunityStyle.normal_text}> {createdOpportunity.position}</Text>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(CreatedOpportunityItem);
