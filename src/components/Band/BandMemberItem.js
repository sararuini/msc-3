import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class BandMemberItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      bandMemberUsername: "",
      bandMemberRole: "",
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.retrieveMemberInfo();
    this.setState({ loading: false });
  };

  retrieveMemberInfo = () => {
    console.log("retrieveMemberInfo");
    const band = this.props.band;
    const bandMember = this.props.bandMember.uid;
    console.log("band" + band);
    console.log("bandMember " + bandMember);
    this.props.firebase
      .bandMember(band, bandMember)
      .once("value", (snapshot) => {
        const bandMemberObj = snapshot.val();

        if (bandMemberObj) {
          this.setState({ bandMemberRole: bandMemberObj.userRole });
          console.log("roooole" + this.state.bandMemberRole);
        }

        this.props.firebase.user(bandMember).once("value", (snapshot) => {
          const memberName = snapshot.val();
          this.setState({ bandMemberUsername: memberName.username });
          console.log("usernaaaame" + this.state.bandMemberUsername);
        });
      });
  };

  componentWillUnmount() {
    this.props.firebase
      .bandMember(this.props.band.uid, this.props.bandMember.uid)
      .off();
  }

  render() {
    const { authUser, bandMember, band } = this.props;
    const { bandMemberUsername, bandMemberRole } = this.state;

    return (
      <div>
        <ul>
          <Link
            to={{
              pathname: `${ROUTES.USERS}/${bandMember.uid}`,
            }}
          >
            {bandMemberUsername}
          </Link>
          <p>Role: {bandMemberRole} </p>
        </ul>
      </div>
    );
  }
}

export default withFirebase(BandMemberItem);
