import React, { Component } from "react";

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
      applicationStatus: "",
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

    this.props.firebase.userAppliedOpportunity(thisUser, thisOpp).on("value", snapshot => {
      const applicationText = snapshot.val().applicationText

      this.setState({applicationText: applicationText})
    })
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  componentDidMount() {
    this.setState({ loading: true });
    this.retrieveInfo()
    console.log("aaaaaaapplicantttttt" + this.props.applicant.uid);
    console.log("aaaaaaapplicantttttt" + this.props.opportunity);
    this.setState({ loading: false });
  }

  render() {
    const { authUser, applicant } = this.props;
    const { applicantUsername, applicationText, applicationStatus} = this.state;

    return (
      <div>
        {authUser && (
          <div>
          <p>Applicant: </p>
          <Link
            to={{
              pathname: `${ROUTES.USERS}/${applicant.uid}`,
            }}
          >
            {applicantUsername}
            
          </Link>
          <p>Application Text: {applicationText} </p>
          </div> 
        )}
  {/* 
  <View>
              <label>
                <Text>Select application status:</Text>
                <select
                  defaultValue={applicationStatus}
                  onChange={this.onChange}
                >
                  <option value="professional">
                    Successful
                  </option>
                  <option value="unsuccessful">Unsuccessful</option>
                  <option value="musician-professional">Pending</option>
                  <option value="other">Interview Scheduled</option>
                  <option value="other">Waiting for a response</option>
                </select>


                <form onSubmit={() => {
            this.onApplyToOpportunity(opportunity.uid);
          }}>
            <input type="text" value={statusMessage} onChange={this.onChangeApplicationText} />
          <button type="submit">Send Application</button>
          </form>
              </label>
            </View>*/}
          
      </div>
    );
  }
}

export default withFirebase(ApplicantItem);
