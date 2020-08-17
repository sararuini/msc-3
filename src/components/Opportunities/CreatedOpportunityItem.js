import React, { Component } from "react";

import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Applicants from "./Applicants";
import * as ROUTES from "../../constants/routes";

class CreatedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      oppTitle: "",
      applicants: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadCreatedOpportunity();
    // this.loadApplicants()
    this.setState({ loading: false });
  }

  loadCreatedOpportunity = () => {
    const thisCreatedOpportunity = this.props.opportunityCreated.uid;
    console.log("thisConnection " + thisCreatedOpportunity);
    this.props.firebase
      .opportunity(thisCreatedOpportunity)
      .once("value", (snapshot) => {
        const createdOpportunityObject = snapshot.val();
        const oppTitle = createdOpportunityObject.title;

        this.setState({ oppTitle: oppTitle });
      });

    this.props.firebase
      .appliedOpportunity(thisCreatedOpportunity)
      .limitToLast(this.state.limit)
      .once("value", (snapshot) => {
        const appliedOpportunityObj = snapshot.val();
        
        if (appliedOpportunityObj) {
          for (const appliedOpportunityId in appliedOpportunityObj) {
            if (appliedOpportunityObj.hasOwnProperty(appliedOpportunityId)) {
              const appliedOpportunity =
                appliedOpportunityObj[appliedOpportunityId];
                console.log("appliedOpportunityId    " + appliedOpportunityId)
                  const applicantKey = Object.keys(appliedOpportunity)[0]
                  console.log("applicants" + applicantKey)
            }
          }
        }
      });
  };

  /*
  loadApplicants = () => {
    const thisCreatedOpportunity = this.props.opportunityCreated.uid;
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("loading applicants");
        this.props.firebase
          .appliedOpportunity(thisCreatedOpportunity)
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const appliedOpportunityObj = snapshot.val();
            console.log(appliedOpportunityObj)
            if (appliedOpportunityObj) {
              for (const appliedOpportunityId in appliedOpportunityObj) {
                if (
                  appliedOpportunityObj.hasOwnProperty(appliedOpportunityId)
                ) {
                  const appliedOpportunity =
                    appliedOpportunityObj[appliedOpportunityId];
                  console.log("appliedOpportunityId " + appliedOpportunityId);

                  const applicants = Object.keys(appliedOpportunityObj).map(
                    (key) => ({
                      ...appliedOpportunityObj[key],
                      uid: key,
                    })
                  )
                  this.setState({
                    applicants: applicants,
                    loading: false,
                  });
                }
              }
            } else {
              this.setState({ applicants: null });
            }
          })
      }
    });
  };
  */

  onNextPageApplicants = () => {
    this.setState((state) => ({ limit: state.limit + 5 }), this.loadApplicants);
  };

  render() {
    const { authUser, opportunityCreated } = this.props;
    const { oppTitle, applicants, loading } = this.state;

    return (
      <div>
        {authUser && (
          <span>
            <ul> Code: {opportunityCreated.uid} </ul>
            <ul> {oppTitle}</ul>

            <h4>Applicants for {oppTitle}:</h4>
            {applicants}

            {!loading && applicants && applicants.length > 3 && (
              <button type="button" onClick={this.onNextPageApplicants}>
                More applicants
              </button>
            )}
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(CreatedOpportunityItem);
