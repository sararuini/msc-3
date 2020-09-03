import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import CreatedOpportunityList from "./CreatedOpportunityList";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { View, Text } from "react-native-web";
import opportunityStyle from "./styles";

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
            const createdOpportunityObject = snapshot.val();

            if (createdOpportunityObject) {
              for (const createdOppId in createdOpportunityObject) {
                if (createdOpportunityObject.hasOwnProperty(createdOppId)) {
                  console.log("createdOppId" + createdOppId);
                  this.props.firebase
                    .opportunity(createdOppId)
                    .on("value", (snapshot) => {
                      const opportunityObject = snapshot.val();
                      console.log("tiiiiitle: " +opportunityObject.title)
                      console.log("deeees: " +opportunityObject.description)

                      if (opportunityObject) {
                        const opportunitiesCreated = Object.keys(
                          createdOpportunityObject
                        ).map((key) => ({
                          ...createdOpportunityObject[key],
                          uid: key,
                        }));
                        this.setState({
                          opportunitiesCreated: opportunitiesCreated,
                          loading: false,
                        });
                      } else {
                        this.setState({ opportunitiesCreated: null });
                      }
                    });
                }
              }
            }
          });
      }
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
    console.log(opportunityCreated);
    const { uid, ...opportunityCreatedSnapshot } = opportunityCreated;
    console.log("editOpportunity sectiooooon" + opportunityCreated.uid);

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

  onRemoveOpportunity = (authUser, uid) => {
    this.props.firebase.opportunity(uid).remove();
    this.props.firebase.userCreatedOpportunity(authUser.uid, uid).remove();
  };
*/
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
    const {
      opportunitiesCreated,
      loading,
    } = this.state;

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

            {opportunitiesCreated && (
              <CreatedOpportunityList
                authUser={authUser}
                opportunitiesCreated={opportunitiesCreated}
                //onEditOpportunity={this.onEditOpportunity}
                //onRemoveOpportunity={this.onRemoveOpportunity}
              />
            )}

            {!loading &&
              opportunitiesCreated &&
              opportunitiesCreated.length > 2 && (
                <button type="button" onClick={this.onNextPage}>
                  <Text style={opportunityStyle.normal_text}>View more opportunities created by you</Text>
                </button>
              )}

            {!opportunitiesCreated && (
              <Text style={opportunityStyle.normal_text}>You have no opportunities created by you ...</Text>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(CreatedOpportunities);
