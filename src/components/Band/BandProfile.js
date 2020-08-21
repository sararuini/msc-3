import React, { Component } from "react";

import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import BandMemberList from "./BandMemberList";
import BandRequestList from "./BandRequestList";

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

        this.props.firebase.band(bandUid).once("value", (snapshot) => {
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
          .once("value", (snapshot) => {
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
          .once("value", (snapshot) => {
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
          .once("value", (snapshot) => {
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
          .once("value", (snapshot) => {
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
              Edit {band.name}'s profile'
            </Link>
          </div>
        )}

        {!bandMember && !bandPendingMembership && (
          <div>
            <form onSubmit={this.sendBandMembershipRequest}>
              <label> Your role in the band: </label>
              <input
                type="text"
                value={userRole}
                onChange={this.onSelectRole}
              />
              <button type="submit">Send Membership Request</button>
            </form>
          </div>
        )}

        {bandMember && (
          <div>Review band membership request received:</div>
        )}
        
        {bandMember && !bandMembersRequests && (
          <div> There are no band membership requests </div>
        )}

        {bandMember && bandMembersRequests && (
          <BandRequestList
            authUser={authUser}
            bandMembersRequests={bandMembersRequests}
            band={bandId}
          />
        )}

        {band && !bandMember && bandPendingMembership && (
          <div>
            Band membership pending. Your request will be approved by one of the
            band members
          </div>
        )}

        {band && (
          <div>
            <h2> {band.name} profile </h2>
            <p> Music Genre: {band.musicGenre}</p>
            <p> Location: {band.location}</p>
            <p> Headline: {band.headline}</p>
            <p> Email Address: {band.emailAddress}</p>
            <p> Website: {band.website}</p>
            <p> Biography: {band.biography}</p>
            <p>Facebook: {band.facebook}</p>
            <p> Instagram {band.instagram}</p>
            <p> Twitter: {band.twitter}</p>
            <p> TikTok: {band.tiktok}</p>
            <p> YouTube: {band.youtube}</p>
            <p> Spotify: {band.spotify}</p>
            <p> Soundcloud: {band.soundcloud}</p>
            <p> Apple Music: {band.appleMusic}</p>
            <p> Amazon Music: {band.amazonMusic}</p>
            <p> Deezer: {band.deezer}</p>
            <p> Pandora: {band.pandora}</p>
            <p> Bandcamp: {band.bandcamp}</p>
            <p> Concerts:{band.concerts}</p>
            <p> Concerts:{band.records}</p>
          </div>
        )}

        <div> Band Members:</div>

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
