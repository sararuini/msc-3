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
    };
  }

  retrieveUsername = () => {
    const thisUser = this.props.applicant.uid;
    console.log("thisUser " + thisUser);
    this.props.firebase.user(thisUser).on("value", (snapshot) => {
      const userObj = snapshot.val();
      const username = userObj.username;

      this.setState({ applicantUsername: username });
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.retrieveUsername()
    console.log("aaaaaaapplicantttttt" + this.props.applicant.uid);
    this.setState({ loading: false });
  }

  render() {
    const { authUser, applicant } = this.props;
    const { applicantUsername } = this.state;

    return (
      <div>
        {authUser && (
          <Link
            to={{
              pathname: `${ROUTES.USERS}/${applicant.uid}`,
            }}
          >
            Applicant: {applicantUsername}
          </Link>
        )}
      </div>
    );
  }
}

export default withFirebase(ApplicantItem);
