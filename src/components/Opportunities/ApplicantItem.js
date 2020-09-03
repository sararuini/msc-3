import React, { Component } from "react";
import opportunityStyle from "./styles";
import { Link } from "react-router-dom";
import { View, Text } from "react-native-web";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class ApplicantItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      applicantUsername: "",
      applicationText: "",
      statusMessage: "",
    };
  }

  retrieveInfo = () => {
    const thisUser = this.props.applicant.uid;
    const thisOpp = this.props.opportunity;
    console.log("thisUser " + thisUser);
    console.log("thisOpp " + thisOpp);
    this.props.firebase.user(thisUser).on("value", (snapshot) => {
      const userObj = snapshot.val();
      const username = userObj.username;
      this.setState({ applicantUsername: username });
    });

    this.props.firebase
      .userAppliedOpportunity(thisUser, thisOpp)
      .on("value", (snapshot) => {
        const applicationText = snapshot.val().applicationText;

        this.setState({ applicationText: applicationText });
      });
  };

  onChange = (event) => {
    this.setState({ statusMessage: event.target.value });
  };

  onSendApplicationStatus = (uid) => {
    const applicant = this.props.applicant.uid;
    this.props.firebase.userAppliedOpportunity(applicant, uid).set({
      statusMessage: this.state.statusMessage,
    });

    this.props.firebase.notifications(applicant).push({
      type: "Opportunity Status Notification",
        statusMessage: this.state.statusMessage,
        opportunity: this.props.opportunity,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
    }
        
    )
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.retrieveInfo();
    console.log("applicant" + this.props.applicant.uid);
    console.log("opportunity " + this.props.opportunity);
    this.setState({ loading: false });
  }

  render() {
    const { authUser, applicant, opportunity } = this.props;
    const { applicantUsername, applicationText, statusMessage } = this.state;

    return (
      <div>
        {authUser && (
          <div>
            <Text style={opportunityStyle.header}>Applicant: </Text>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${applicant.uid}`,
              }}
            >
              <Text style={opportunityStyle.normal_text}>
                {applicantUsername}
              </Text>
              
            </Link>
            <Text style={opportunityStyle.header}>Application Text: </Text> <Text style={opportunityStyle.normal_text}> {applicationText} </Text>
          </div>
        )}

        
          <div>
            <form
              onSubmit={() => {
                this.onSendApplicationStatus(opportunity);
              }}
            >
              <input
                type="text"
                value={statusMessage}
                placeholder="Application Status"
                onChange={this.onChange}
              />
              <button type="submit"><Text style={opportunityStyle.normal_text}>Send Application Status</Text></button>
            </form>
          </div>

      </div>
    );
  }
}

export default withFirebase(ApplicantItem);
