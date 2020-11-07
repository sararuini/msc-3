import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import OpportunityList from "./OpportunityList";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import opportunityStyle from "./styles";
import { View, Text, TextInput, Image } from "react-native-web";

class OpportunitiesAvailable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: "",
      description: "",
      location: "",
      jobType: "",
      salary: "",
      jobTags: "",
      startingDate: "",
      skills: "",
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
          console.log(opportunityList)

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

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 3 }),
      this.onListenForOpportunities
    );
  };

  render() {
    const {
      position,
      description,
      contact,
      location,
      jobType,
      jobTags,
      salary,
      skills,
      startingDate,
      opportunities,
      loading,
    } = this.state;

    const isInvalid = position === "" || location === "" || contact === "";

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (

          <View>
            {loading && <div><Text style={opportunityStyle.normal_text}>Loading ...</Text></div>}
            <View>
              <Link
                to={{
                  pathname: `${ROUTES.OPPORTUNITIES}`,
                }}
              >
               <Text style={opportunityStyle.normal_text}>Go back to main opportunities page</Text>
              </Link>
            
            <Text style={opportunityStyle.normal_text}>Current available Opportunities: </Text>
            {opportunities && (
              <OpportunityList
                authUser={authUser}
                opportunities={opportunities}
              />
            )}

            {!loading && opportunities && opportunities.length > 3 && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}
            </View>

            {!opportunities && <div>There are no opportunities ...</div>}
            
          </View>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(OpportunitiesAvailable);
