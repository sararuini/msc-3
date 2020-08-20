import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class ApplicantItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      applicantUsername: "",
      applicationText: "",
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

  componentDidMount() {
    this.setState({ loading: true });
    this.retrieveInfo()
    console.log("aaaaaaapplicantttttt" + this.props.applicant.uid);
    console.log("aaaaaaapplicantttttt" + this.props.opportunity);
    this.setState({ loading: false });
  }

  render() {
    const { authUser, applicant } = this.props;
    const { applicantUsername, applicationText} = this.state;

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
      </div>
    );
  }
}

export default withFirebase(ApplicantItem);
