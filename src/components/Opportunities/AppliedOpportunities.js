import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import AppliedOpportunityList from "./AppliedOpportunityList";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import opportunityStyle from "./styles";
import { View, Text } from "react-native-web";

class AppliedOpportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      appliedOpportunities: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadAppliedOpportunities();
    this.setState({ loading: false });
  }

  loadAppliedOpportunities = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase
          .userAppliedOpportunities(currentUserId)
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
                appliedOpportunities: appliedOpportunityList,
              });
            } else {
              this.setState({ appliedOpportunities: null });
            }
          });
      }
    });
  };

  componentWillUnmount = () => {
    this.props.firebase.userAppliedOpportunities().off();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.loadAppliedOpportunities
    );
  };

  render() {
    const { appliedOpportunities, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            <Link
                to={{
                  pathname: `${ROUTES.OPPORTUNITIES}`,
                }}
              >
               <Text style={opportunityStyle.normal_text}>Go back to main opportunities page</Text>
              </Link>

            {appliedOpportunities && (
              <AppliedOpportunityList
                authUser={authUser}
                appliedOpportunities={appliedOpportunities}
              />
            )}

            {!loading &&
              appliedOpportunities &&
              appliedOpportunities.length > 5 && (
                <button type="button" onClick={this.onNextPage}>
                  <Text style={opportunityStyle.normal_text}>View more applied opportunities</Text>
                </button>
              )}

            {!appliedOpportunities && (
              <div><Text style={opportunityStyle.normal_text}>You have no applied opportunities ...</Text></div>
            )}

          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(AppliedOpportunities);
