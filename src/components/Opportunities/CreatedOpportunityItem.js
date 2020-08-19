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
      limit: 5,
      editMode: false,
      editTitle: "",
      editDescription: "",
      editLocation:"",
      editJobType: "",
      editSalary: "",
      editJobTags: "",
      editStartingDate: "",
      editContact: "",
      createdOpportunityObject: "",
      /*
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
      */
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("THIS IS LOADING CREATED OPP (CREATED OPP ITEM)")
    this.loadCreatedOpportunity();
    console.log("DONE LOADING CREATED OPP (CREATED OPP ITEM)")
    this.retrieveUsername();
    //this.loadApplicants()
    this.setState({ loading: false });
  }

  retrieveUsername = () => {
    const opp = this.props.opportunityCreated.uid;
    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const createdBy = oppObj.createdBy;
      console.log("createdBy (username)" + createdBy);
      this.props.firebase.user(createdBy).once("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        this.setState({ opportunityCreator: userUsername });
      });
    });
  };
  /*
  onEditOpportunity = (
    opportunityCreated,
    title,
    description,
    contact,
    location,
    jobType,
    jobTags,
    salary,
    startingDate
  ) => {
    console.log(opportunityCreated)
    //if (opportunityCreated) {}
    const { uid, ...opportunityCreatedSnapshot } = opportunityCreated;
    console.log("editOpportunity sectiooooon" + opportunityCreated.uid)

    this.props.firebase.opportunity(opportunityCreated.uid).set({
      ...opportunityCreatedSnapshot,
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

  onRemoveOpportunity = (authUser) => {
    const uid = this.props.createdOppo
    this.props.firebase.opportunity(uid).remove();
    this.props.firebase.userCreatedOpportunity(authUser.uid, uid).remove();
  };

  */
 
  loadCreatedOpportunity = () => {
    const thisCreatedOpportunity = this.props.opportunityCreated.uid;
    console.log("loadCreatedOpportunity start")
    console.log("this opp " + thisCreatedOpportunity);
    this.props.firebase
      .opportunity(thisCreatedOpportunity)
      .on("value", (snapshot) => {
        const createdOpportunityObject = snapshot.val();
        /*
        this.setState({createdOpportunityObject: createdOpportunityObject})
        
        if (createdOpportunityObject) {
          for (const createdOppId in createdOpportunityObject) {
            if (createdOpportunityObject.hasOwnProperty(createdOppId)) {
              const createdOpp = createdOpportunityObject[createdOppId]
              console.log("title" + createdOpp.title)
            }
          }
        }
        *
        
        /*if (createdOpportunityObject) {
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
        }
        */

        console.log("loadCreatedOpportunity title" + createdOpportunityObject.title)
        console.log("loadCreatedOpportunity location" + createdOpportunityObject.location)

        /*else {
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
         
        } */
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

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.state.createdOpportunityObject.title,
      editDescription: this.state.createdOpportunityObject.description,
      editLocation: this.state.createdOpportunityObject.location,
      editJobType: this.state.createdOpportunityObject.jobType,
      editSalary: this.state.createdOpportunityObject.salary,
      editJobTags: this.state.createdOpportunityObject.jobTags,
      editStartingDate: this.state.createdOpportunityObject.startingDate,
      editContact: this.state.createdOpportunityObject.contact,
    }));

    console.log("edit mode start")
    console.log(this.state.editMode)
    console.log("this.state.editTitle")
    console.log("edit mode finish")
  };

  onChangeEdit = (event) => {
      this.setState({ [event.target.name]: event.target.value });
      console.log("change edit event")
      console.log("event")
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
      loading,
      opportunityCreator,
      createdOpportunityObject
      /*
      title,
            description,
            location,
            jobType,
            startingDate,
            contact,
            salary,
            jobTags,
      loading,
      */
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
              <label> Title </label>
              <input
                type="text"
                value={editTitle}
                name="editTitle"
                onChange={this.onChangeEdit}
              />

<label> Description </label>
              <input
                type="text"
                name="editDescription"
                value={editDescription}
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
        {!editMode &&(
          <span>
            <ul>
              <label>Title: </label>
              {createdOpportunityObject.title}
            </ul>
            <ul>
              <label> Description:</label>
              {createdOpportunityObject.description}
            </ul>
            <ul>
              <label>Location: </label>
              {createdOpportunityObject.location}
            </ul>
            <ul>
              <label>Job Type: </label>
              {createdOpportunityObject.jobType}
            </ul>
            <ul>
              <label>Contact: </label> {createdOpportunityObject.contact}
            </ul>
            <ul>
              <label>Tags: </label>
              {createdOpportunityObject.jobTags}
            </ul>
            <ul>
              <label>Salary: </label>
              {createdOpportunityObject.salary}
            </ul>
            <ul>
              <label>Starting Date:</label>
              {createdOpportunityObject.startingDate}
            </ul>
            <ul>
              <label>Opportunity Code:</label>
              {opportunityCreated.uid}
            </ul>
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
