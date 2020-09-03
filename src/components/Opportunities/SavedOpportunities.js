import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import SavedOpportunityList from "./SavedOpportunityList";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { View, Text, } from "react-native-web";
import opportunityStyle from "./styles";

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
        console.log("loading saved")
        this.props.firebase
          .userSavedOpportunities(currentUserId)
          .orderByChild("savedAt")
          .limitToLast(this.state.limit)
          .once("value", (snapshot) => {
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
          <View>
            {loading && <div>Loading ...</div>}
            
              <Link
                to={{
                  pathname: `${ROUTES.OPPORTUNITIES}`,
                }}
              >
               <Text style={opportunityStyle.normal_text}>Go back to main opportunities page</Text>
            </Link>
            
            
            <Text style={opportunityStyle.header}>Saved Opportunities</Text>

            
            {savedOpportunities && (
              <SavedOpportunityList
                authUser={authUser}
                savedOpportunities={savedOpportunities}
              />
            )}

            {!loading && savedOpportunities && savedOpportunities.length > 5 && (
              <button type="button" onClick={this.onNextPage}>
                <Text style={opportunityStyle.normal_text}>View more saved opportunities </Text>
              </button>
            )}

            {!savedOpportunities && (
              <div><Text style={opportunityStyle.normal_text}>You have no saved opportunities ...</Text></div>
            )}
            </View>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(SavedOpportunities);
