import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import CreatedOpportunityList from "./CreatedOpportunityList";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

class CreatedOpportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      opportunitiesCreated: [],
      limit: 2,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadMyOpportunities();
    this.setState({ loading: false });
  }

  loadMyOpportunities = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase
          .userCreatedOpportunities(currentUserId)
          .orderByChild("appliedAt")
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const appliedOpportunityObj = snapshot.val();

            if (appliedOpportunityObj) {
              const appliedOpportunityList = Object.keys(
                appliedOpportunityObj
              ).map((key) => ({
                ...appliedOpportunityObj[key],
                uid: key,
              }));

              this.setState({
                opportunitiesCreated: appliedOpportunityList,
                loading: false,
              });
            } else {
              this.setState({ opportunitiesCreated: null });
            }
          });
      }
    });
  };

  onEditOpportunity = (
    opportunity,
    title,
    description,
    contact,
    location,
    jobType,
    jobTags,
    salary,
    startingDate
  ) => {
    const { uid, ...opportunitySnapshot } = opportunity;

    this.props.firebase.opportunity(opportunity.uid).set({
      ...opportunitySnapshot,
      title,
      description,
      location,
      contact,
      jobType,
      jobTags,
      salary,
      startingDate,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveOpportunity = (authUser, uid) => {
    this.props.firebase.opportunity(uid).remove();
    this.props.firebase.userCreatedOpportunity(authUser.uid, uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 3 }),
      this.onListenForOpportunities
    );
  };

  componentWillUnmount = () => {
    this.props.firebase.userCreatedOpportunities().off();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 2 }),
      this.loadMyOpportunities
    );
  };

  render() {
    const { opportunitiesCreated, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            {opportunitiesCreated && (
              <CreatedOpportunityList
                authUser={authUser}
                opportunitiesCreated={opportunitiesCreated}
                onEditOpportunity={this.onEditOpportunity}
                onRemoveOpportunity={this.onRemoveOpportunity}

              />
            )}

            {!loading &&
              opportunitiesCreated &&
              opportunitiesCreated.length > 2 && (
                <button type="button" onClick={this.onNextPage}>
                  View more opportunities created by you
                </button>
              )}

            {!opportunitiesCreated && (
              <div>
                You have no opportunities created by you ...
              </div>
            )}
            <Link
              to={{
                pathname: `${ROUTES.OPPORTUNITIES}`,
              }}
            >
              {" "}
              Opportunities
            </Link>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(CreatedOpportunities);
