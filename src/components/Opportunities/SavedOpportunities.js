import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import SavedOpportunityList from "./SavedOpportunityList";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

class SavedOpportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      savedOpportunities: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadSavedOpportunities();
    this.setState({ loading: false });
  }

  loadSavedOpportunities = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase
          .userSavedOpportunities(currentUserId)
          .orderByChild("savedAt")
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const savedOpportunityObj = snapshot.val();

            if (savedOpportunityObj) {
              const savedOpportunityList = Object.keys(savedOpportunityObj).map(
                (key) => ({
                  ...savedOpportunityObj[key],
                  uid: key,
                })
              );

              this.setState({
                savedOpportunities: savedOpportunityList,
              });
            } else {
              this.setState({ savedOpportunities: null });
            }
          });
      }
    });
  };

  componentWillUnmount = () => {
    this.props.firebase.userSavedOpportunities().off();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.loadSavedOpportunities
    );
  };

  render() {
    const { savedOpportunities, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}
            <span>Saved Opportunities</span>
            
            {savedOpportunities && (
              <SavedOpportunityList
                authUser={authUser}
                savedOpportunities={savedOpportunities}
              />
            )}

            {!loading && savedOpportunities && savedOpportunities.length > 5 && (
              <button type="button" onClick={this.onNextPage}>
                View more saved opportunities
              </button>
            )}

            {!savedOpportunities && (
              <div>You have no saved opportunities ...</div>
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
export default withFirebase(SavedOpportunities);
