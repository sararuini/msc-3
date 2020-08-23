import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import ApplicantList from "./ApplicantList";

class CreatedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
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
      createdOpportunity: "",
      applicants: "",
      title: "",
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

    console.log("title of opp loading: " + this.props.opportunityCreated.title);
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
          "loadCreatedOpportunity title" + createdOpportunityObject.title
        );
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
      editTitle: this.state.createdOpportunity.title,
      editDescription: this.state.createdOpportunity.description,
      editLocation: this.state.createdOpportunity.location,
      editJobType: this.state.createdOpportunity.jobType,
      editSalary: this.state.createdOpportunity.salary,
      editJobTags: this.state.createdOpportunity.jobTags,
      editStartingDate: this.state.createdOpportunity.startingDate,
      editContact: this.state.createdOpportunity.contact,
    }));

    console.log("edit mode start");
    console.log(this.state.editMode);
    console.log("title " + this.props.opportunityCreated.title);
    console.log("edit mode finish");
  };

  onChangeEdit = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("change edit event");
    console.log("event");
  };

  onSaveEdit = () => {
    this.onEditOpportunity(this.state.createdOpportunity, this.state.editTitle);

    this.onEditOpportunity(
      this.state.createdOpportunity,
      this.state.editDescription
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

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, opportunityCreated } = this.props;
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
      createdOpportunity,
      opportunityCreator,
      applicants,
      //createdOpportunityObject
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

        {!editMode && authUser && (
          <span>
            <ul>
              <label>Title: </label>
              {createdOpportunity.title}
            </ul>
            <ul>
              <label> Description:</label>
              {createdOpportunity.description}
            </ul>
            <ul>
              <label>Location: </label>
              {createdOpportunity.location}
            </ul>
            <ul>
              <label>Job Type: </label>
              {createdOpportunity.jobType}
            </ul>
            <ul>
              <label>Contact: </label> {createdOpportunity.contact}
            </ul>
            <ul>
              <label>Tags: </label>
              {createdOpportunity.jobTags}
            </ul>
            <ul>
              <label>Salary: </label>
              {createdOpportunity.salary}
            </ul>
            <ul>
              <label>Starting Date:</label>
              {createdOpportunity.startingDate}
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
                onClick={() => this.onRemoveOpportunity(opportunityCreated.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}

        {applicants && (
          <span>
            <ul>
              <h4>Applicants for {createdOpportunity.title}:</h4>
              <ApplicantList authUser={authUser} applicants={applicants} opportunity={opportunityCreated.uid} />
            </ul>
            </span>
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
            <ul>There are no applicants for {createdOpportunity.title}</ul>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(CreatedOpportunityItem);
