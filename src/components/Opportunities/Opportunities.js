import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

class Opportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      location: "",
      jobType: "",
      salary: "",
      jobTags: "",
      startingDate: "",
      contact: "",
      loading: false,
      opportunities: [],
      limit: 3,
    };
  }

  componentDidMount() {
    this.onListenForOpportunities();
  }

  onListenForOpportunities = () => {
    this.setState({ loading: true });

    this.props.firebase
      .opportunities()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const opportunityObject = snapshot.val();

        if (opportunityObject) {
          const opportunityList = Object.keys(opportunityObject).map((key) => ({
            ...opportunityObject[key],
            uid: key,
          }));

          this.setState({
            opportunities: opportunityList,
            loading: false,
          });
        } else {
          this.setState({ opportunities: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.opportunities().off();
  }

  onChangeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateOpportunity = (event, authUser) => {
    const oppRef = this.props.firebase.opportunities().push();
    const oppKey = oppRef.key;

    oppRef.set({
      createdBy: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      jobType: this.state.jobType,
      contact: this.state.contact,
      salary: this.state.salary,
      jobTags: this.state.jobTags,
      startingDate: this.state.startingDate,
    });

    this.props.firebase.userCreatedOpportunity(authUser.uid, oppKey).set({
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({
      title: "",
      description: "",
      contact: "",
      location: "",
      createdAt: "",
      jobType: "",
      jobTags: "",
      salary: "",
      startingDate: "",
    });
  };

  render() {
    const {
      title,
      description,
      contact,
      location,
      jobType,
      jobTags,
      salary,
      startingDate,
      opportunities,
      loading,
    } = this.state;
    const isInvalid = title === "" || location === "" || contact === "";

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (

          <div>
            {loading && <div>Loading ...</div>}
            <ul>
              <Link
                to={{
                  pathname: `${ROUTES.OPPORTUNITIES_SAVED}`,
                }}
              >
                Saved opportunities
              </Link>
            </ul>

            <ul>
              <Link
                to={{
                  pathname: `${ROUTES.OPPORTUNITIES_PUBLISHED}`,
                }}
              >
                Published opportunities
              </Link>
            </ul>

            <ul>
              <Link
                to={{
                  pathname: `${ROUTES.OPPORTUNITIES_APPLIED}`,
                }}
              >
                Applied opportunities
              </Link>
            </ul>

            <ul>
              <Link
                to={{
                  pathname: `${ROUTES.OPPORTUNITIES_AVAILABLE}`,
                }}
              >
                Available opportunities
              </Link>
            </ul>
            <form
              onSubmit={(event) => this.onCreateOpportunity(event, authUser)}
            >


              <label>
                <strong>Create a new opportunity</strong>
              </label>
              <input
                type="text"
                value={title}
                name="title"
                placeholder="Opportunity title"
                onChange={(event) => this.onChangeText(event, "firstName")}
              />
              <input
                type="text"
                placeholder="Opportunity description"
                value={description}
                name="description"
                onChange={this.onChangeText}
              />
              <input
                type="text"
                name="location"
                value={location}
                placeholder="Location"
                onChange={this.onChangeText}
              />
              <input
                type="text"
                name="jobType"
                placeholder="Job Type e.g.(Full-time, Part-time, Commission, Freelancer, One-Off...)"
                value={jobType}
                onChange={this.onChangeText}
              />
              <input
                type="text"
                name="jobTags"
                placeholder="Job Tags e.g.(Music Publishing, London, etc.)"
                value={jobTags}
                onChange={this.onChangeText}
              />
              <input
                type="text"
                name="startingDate"
                value={startingDate}
                placeholder="Starting Date"
                onChange={this.onChangeText}
              />
              <input
                type="text"
                name="contact"
                value={contact}
                placeholder="Contact Details to Apply to opportunity"
                onChange={this.onChangeText}
              />
              <input
                type="text"
                name="salary"
                value={salary}
                placeholder="Salary"
                onChange={this.onChangeText}
              />
              <button disabled={isInvalid} type="submit">
                Publish
              </button>
            </form>
              
            {/*
            <span> Current Opportunities: </span>
            {opportunities && (
              <OpportunityList
                authUser={authUser}
                opportunities={opportunities}
                onEditOpportunity={this.onEditOpportunity}
                onRemoveOpportunity={this.onRemoveOpportunity}
                onSaveOpportunity={this.onSaveOpportunity}
                onUnsaveOpportunity={this.onUnsaveOpportunity}
                onApplyToOpportunity={this.onApplyToOpportunity}
              />
            )}

            {!loading && opportunities && opportunities.length > 3 && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {!opportunities && <div>There are no opportunities ...</div>}
            
            */}
            

            
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Opportunities);
