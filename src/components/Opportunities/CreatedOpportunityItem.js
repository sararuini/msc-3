import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Applicants from "./Applicants";

class CreatedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      applicants: [],
      limit: 5,
      editMode: false,
      editTitle: this.props.opportunityCreated.title,
      editDescription: this.props.opportunityCreated.description,
      editLocation: this.props.opportunityCreated.location,
      editJobType: this.props.opportunityCreated.jobType,
      editSalary: this.props.opportunityCreated.salary,
      editJobTags: this.props.opportunityCreated.jobTags,
      editStartingDate: this.props.opportunityCreated.startingDate,
      editContact: this.props.opportunityCreated.contact,
      title: "",
      description: "",
      location: "",
      jobType: "",
      startingDate: "",
      contact: "",
      startingDate: "",
      salary: "",
      jobTags: "",
      opportunityCreator: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadCreatedOpportunity();
    this.retrieveUsername();
    //this.loadApplicants()
    this.setState({ loading: false });
  }

  retrieveUsername = () => {
    const opp = this.props.opportunityCreated.uid;
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

  loadCreatedOpportunity = () => {
    const thisCreatedOpportunity = this.props.opportunityCreated.uid;
    console.log("this opp " + thisCreatedOpportunity);
    this.props.firebase
      .opportunity(thisCreatedOpportunity)
      .on("value", (snapshot) => {
        const createdOpportunityObject = snapshot.val();
        if (createdOpportunityObject) {
          this.setState({
            title: createdOpportunityObject.title,
            description: createdOpportunityObject.description,
            location: createdOpportunityObject.location,
            jobType: createdOpportunityObject.jobType,
            startingDate: createdOpportunityObject.startingDate,
            contact: createdOpportunityObject.contact,
            salary: createdOpportunityObject.salary,
            jobTags: createdOpportunityObject.jobTags,
          });
        } else {
          this.setState({
            title: "",
            description: "",
            location: "",
            jobType: "",
            startingDate: "",
            contact: "",
            salary: "",
            jobTags: "",
          });
        }
      });

    /*
    this.props.firebase
      .appliedOpportunity(thisCreatedOpportunity)
      .limitToLast(this.state.limit)
      .once("value", (snapshot) => {
        const appliedOpportunityObj = snapshot.val();
        const applicantKey = Object.keys(appliedOpportunityObj)[0]
        console.log("applicant key" + applicantKey)

        console.log("---------")
        
        if (appliedOpportunityObj) {
          for (const appliedOpportunityId in appliedOpportunityObj) {
            if (appliedOpportunityObj.hasOwnProperty(appliedOpportunityId)) {
              const appliedOpportunity =
                appliedOpportunityObj[appliedOpportunityId];
                console.log("appliedOpportunityId    " + appliedOpportunityId)
                  const applicantKey = Object.keys(appliedOpportunity)[0]
                  console.log("applicants" + applicantKey)
            }
          }
        }
       
      });
       */
  };

  /*
  loadApplicants = () => {
    const thisCreatedOpportunity = this.props.opportunityCreated.uid;
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("loading applicants");
        this.props.firebase
          .appliedOpportunity(thisCreatedOpportunity)
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const appliedOpportunityObj = snapshot.val();
            console.log(appliedOpportunityObj)
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
                  )
                  this.setState({
                    applicants: applicants,
                    loading: false,
                  });
                }
              }
            } else {
              this.setState({ applicants: null });
            }
          })
      }
    });
  };
  */

  onNextPageApplicants = () => {
    this.setState((state) => ({ limit: state.limit + 5 }), this.loadApplicants);
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.props.opportunityCreated.title,
      editDescription: this.props.opportunityCreated.description,
      editLocation: this.props.opportunityCreated.location,
      editJobType: this.props.opportunityCreated.jobType,
      editSalary: this.props.opportunityCreated.salary,
      editJobTags: this.props.opportunityCreated.jobTags,
      editStartingDate: this.props.opportunityCreated.startingDate,
      editContact: this.props.opportunityCreated.contact,
    }));
  };

  onChangeEdit = (event) => {
    if (event.target.name !== "editSavedOpportunity") {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  onSaveEdit = () => {
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editTitle
    );
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editDescription
    );
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editLocation
    );
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editJobTags
    );
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editJobType
    );
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editContact
    );
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editStartingDate
    );
    this.props.onEditOpportunity(
      this.props.opportunityCreated,
      this.state.editSalary
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, opportunityCreated, onRemoveOpportunity } = this.props;
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
      opportunityCreator,
      applicants,
      loading,
      title,
      description,
      location,
      jobType,
      salary,
      contact,
      startingDate,
      jobTags,
    } = this.state;

    const isInvalid =
      editTitle === "" ||
      editLocation === "" ||
      editContact === "" ||
      editJobType === "";

    return (
      <div>
        {loading && <div>Loading ...</div>}

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

        {!editMode && (
          <span>
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
              {opportunityCreated.uid}
            </ul>

            {opportunityCreated.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser && (
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
                onClick={() => onRemoveOpportunity(opportunityCreated.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
        {/*

        {authUser && (
          <span>
            <ul> Code: {opportunityCreated.uid} </ul>
            <ul> {oppTitle}</ul>

            <h4>Applicants for {title}:</h4>
            {applicants}
            
            {!loading && applicants && (
              <Applicants />
            )}

            
            {!loading && applicants && applicants.length > 3 && (
              <button type="button" onClick={this.onNextPageApplicants}>
                More applicants
              </button>
            )}
           
          </span>
        )}
        */}
      </div>
    );
  }
}

export default withFirebase(CreatedOpportunityItem);
