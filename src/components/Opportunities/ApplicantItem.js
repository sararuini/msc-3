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
    this.setState({ loading: false });
  }

  render() {
    const { authUser, applicant } = this.props;

    return (
      <div>
        {authUser && (
          <span>
            <ul> Applicant: {applicant.uid} </ul>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(ApplicantItem);
