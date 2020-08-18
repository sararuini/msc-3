import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import ApplicantList from "./ApplicantList";

class Applicants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      applicants: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadApplicants();
    this.setState({ loading: false });
  }

  
  loadApplicants = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("loading applicants")
        this.props.firebase
          .appliedOpportunities()
          .limitToLast(this.state.limit)
          .once("value", (snapshot) => {
            const appliedOpportunityObj = snapshot.val();

            if (appliedOpportunityObj) {
                for (const appliedOpportunityId in appliedOpportunityObj) {
                    if (appliedOpportunityObj.hasOwnProperty(appliedOpportunityId)) {
                        const appliedOpportunity = appliedOpportunityObj[appliedOpportunityId]
                        this.props.firebase.appliedOpportunity(appliedOpportunity).on("value",
                        (snapshot) => {
                            const applicant = snapshot.val()
                            console.log("applicant" + applicant)
                        })
                    }
                }
              

              this.setState({
                applicants: "",
              });
            } else {
              this.setState({ applicants: null });
            }
          });
      }
    });
  };

  componentWillUnmount = () => {
    this.props.firebase.userAppliedOpportunities().off();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.loadApplicants
    );
  };

  render() {
    const { applicants, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            {applicants && (
              <ApplicantList
                authUser={authUser}
                applicants={applicants}
              />
            )}

            {!loading && applicants && applicants.length > 10 && (
              <button type="button" onClick={this.onNextPage}>
                View more applicants
              </button>
            )}

            {!applicants && <div>You have no applicants ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}
export default withFirebase(Applicants);
