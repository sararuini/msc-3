import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import OpportunityList from "./OpportunityList";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

class OpportunitiesAvailable extends Component {
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
      applicationText: "",
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

  onCreateApplication = (event, authUser, uid) => {
    this.props.firebase.posts().push({
      applicationText: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  }

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 3 }),
      this.onListenForOpportunities
    );
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
                  pathname: `${ROUTES.OPPORTUNITIES}`,
                }}
              >
               Opportunities
              </Link>
            </ul>
            
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
            
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(OpportunitiesAvailable);
