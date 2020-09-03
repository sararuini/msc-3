import React, { Component } from "react";

import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import BandMemberList from "./BandMemberList";
import BandRequestList from "./BandRequestList";
import bandStyle from "./styles";
import { View, Text } from "react-native-web";

class BandProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      band: "",
      bandId: "",
      loading: false,
      bandMember: false,
      bandPendingMembership: false,
      userRole: "",
      bandMembers: [],
      bandMembersRequests: [],
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.loadBandProfile();
    this.setState({ loading: false });
  };

  onSelectRole = (event) => {
    this.setState({ userRole: event.target.value });
  };

  loadBandProfile = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const bandUid = this.props.match.params.id;
        console.log("band");
        console.log("bandUid" + bandUid);
        const currentUser = this.props.firebase.auth.currentUser;
        const userProfileId = currentUser.uid;

        this.setState({ bandId: bandUid });

        this.props.firebase.band(bandUid).on("value", (snapshot) => {
          const bandObject = snapshot.val();
          console.log("loading name" + bandObject.name);
          console.log("loading uid" + bandObject);
          if (bandObject) {
            console.log("loading");
            this.setState({ band: bandObject });
          } else {
            this.setState({ band: null });
          }
        });

        this.props.firebase
          .bandMembers(bandUid)
          .orderByChild("joinedAt")
          .on("value", (snapshot) => {
            const bandMembersObj = snapshot.val();
            if (bandMembersObj) {
              const bandMemberList = Object.keys(bandMembersObj).map((key) => ({
                ...bandMembersObj[key],
                uid: key,
              }));

              this.setState({ bandMembers: bandMemberList });
            } else {
              this.setState({ bandMembers: null });
            }
          });

        this.props.firebase
          .bandMemberRequests(bandUid)
          .on("value", (snapshot) => {
            const bandRequestObj = snapshot.val();
            console.log("bandRequestObj" + bandRequestObj)
            if (bandRequestObj) {
              const bandRequestList = Object.keys(bandRequestObj).map(
                (key) => ({
                  ...bandRequestObj[key],
                  uid: key,
                })
              );

              this.setState({ bandMembersRequests: bandRequestList });
            } else {
              this.setState({ bandMembersRequests: null });
            }
          });

        this.props.firebase
          .bandMember(bandUid,userProfileId)
          .on("value", (snapshot) => {
            const bandExistsObj = snapshot.val();
            console.log("checking membership band");
            if (bandExistsObj) {
              console.log("band memberhsip")
              console.log(true);
              this.setState({ bandMember: true });
            } else {
              console.log(false);
              this.setState({ bandMember: false });
            }
          });
             
        this.props.firebase
          .bandMemberRequest(bandUid, userProfileId)
          .on("value", (snapshot) => {
            const bandMembershipRqstObj = snapshot.val();

            console.log("checking pending membership band");
            if (bandMembershipRqstObj) {
              console.log(true);
              this.setState({ bandPendingMembership: true });
            } else {
              console.log(false);
              this.setState({ bandPendingMembership: false });
            }
          });
          
      }
    });
  };

  sendBandMembershipRequest = () => {
    const band = this.props.match.params.id;
    const currentUser = this.props.firebase.auth.currentUser;
    const userProfileId = currentUser.uid;
    console.log("sending membership rqst");
    this.props.firebase.bandMemberRequest(band, userProfileId).set({
      userRole: this.state.userRole,
    });
    this.setState({ bandPendingMembership: true });
    console.log(" membership rqst sent");

    /*
    this.props.firebase.notifications(this.state.bandMembers).push(
      {
        type: "Band Member Request",
        bandApplicant: userProfileId,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      }
    )
    */
  };

  componentWillUnmount() {
    const band = this.props.match.params.id;
    this.props.firebase.band(band).off();
  }

  render() {
    const { authUser } = this.props;
    const {
      loading,
      band,
      bandId,
      bandMember,
      bandPendingMembership,
      bandMembers,
      userRole,
      bandMembersRequests,
    } = this.state;

    return (
      <div>
        {loading && <div> Loading... </div>}

        {bandMember && (
          <div>
            <Link
              to={{
                pathname: `${ROUTES.BANDS}/${bandId}/edit`,
              }}
            >
              <Text style={bandStyle.normal_text}>

              
              Edit {band.name}'s profile'
              </Text>
            </Link>
          </div>
        )}

        {!bandMember && !bandPendingMembership && (
          <div>
            <form onSubmit={this.sendBandMembershipRequest}>
            <Text style={bandStyle.normal_text}> Your role in the band: </Text>
              <input
                type="text"
                value={userRole}
                onChange={this.onSelectRole}
              />
              <button type="submit"> <Text style={bandStyle.normal_text}>Send Membership Request</Text></button>
            </form>
          </div>
        )}

        {bandMember && (
          <Text style={bandStyle.normal_text}>Review band membership request received:</Text>
        )}
        
        {bandMember && !bandMembersRequests && (
          <Text style={bandStyle.normal_text}>There are no band membership requests </Text>
        )}

        {bandMember && bandMembersRequests && (
          <BandRequestList
            authUser={authUser}
            bandMembersRequests={bandMembersRequests}
            band={bandId}
          />
        )}

        {band && !bandMember && bandPendingMembership && (
          <Text style={bandStyle.normal_text}>
            Band membership pending. Your request will be approved by one of the
            band members
          </Text>
        )}

        {band && (
          <div>
          <ul>
          <Text style={bandStyle.header}>{band.name}</Text>
            <Text style={bandStyle.normal_text}>profile</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Headline:</Text>
            <Text style={bandStyle.normal_text}>{band.headline}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Music Genre:</Text>
            <Text style={bandStyle.normal_text}>{band.musicGenre}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Location:</Text>
            <Text style={bandStyle.normal_text}>{band.location}</Text>
          </ul>
          
          <ul>
          <Text style={bandStyle.header}>Email Address:</Text>
            <Text style={bandStyle.normal_text}>{band.emailAddress}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Website:</Text>
            <Text style={bandStyle.normal_text}>{band.website}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Biography:</Text>
            <Text style={bandStyle.normal_text}>{band.biography}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Facebook:</Text>
            <Text style={bandStyle.normal_text}>{band.facebook}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Twitter:</Text>
            <Text style={bandStyle.normal_text}>{band.twitter}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>TikTok:</Text>
            <Text style={bandStyle.normal_text}>{band.tiktok}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>YouTube:</Text>
            <Text style={bandStyle.normal_text}>{band.youtube}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Spotify:</Text>
            <Text style={bandStyle.normal_text}>{band.spotify}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Soundcloud:</Text>
            <Text style={bandStyle.normal_text}>{band.soundcloud}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Apple Music:</Text>
            <Text style={bandStyle.normal_text}>{band.appleMusic}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Amazon Music:</Text>
            <Text style={bandStyle.normal_text}>{band.amazonMusic}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Deezer:</Text>
            <Text style={bandStyle.normal_text}>{band.deezer}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Pandora:</Text>
            <Text style={bandStyle.normal_text}>{band.pandora}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>BandCamp:</Text>
            <Text style={bandStyle.normal_text}>{band.bandcamp}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Concerts:</Text>
            <Text style={bandStyle.normal_text}>{band.concerts}</Text>
          </ul>
          <ul>
          <Text style={bandStyle.header}>Discography:</Text>
            <Text style={bandStyle.normal_text}>{band.discography}</Text>
          </ul>
          </div>
        )}

        <Text style={bandStyle.header}>Band Members:</Text>

        {bandMembers && (
          <BandMemberList
            authUser={authUser}
            bandMembers={bandMembers}
            band={bandId}
          />
        )}
      </div>
    );
  }
}

export default withFirebase(BandProfile);
