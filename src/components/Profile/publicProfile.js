import React, { Component } from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { withFirebase } from "../Firebase";
import { View, Text } from "react-native-web";

const PublicProfilePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Text>{authUser.username}</Text>
        <PublicProfile authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const PROFILE_CONTENT = {
  username: "",
  profilePicture: "",
  location: "",
  headline: "",
  phoneNumber: "",
  publicEmailAddress: "",
  website: "",
  biography: "",
  reasonsForJoining_findOpportunities: false,
  reasonsForJoining_connectOthers: false,
  reasonsForJoining_offerOpportunities: false,
  reasonsForJoining_promoteServices: false,
  typeOfUserSelection: "",
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  tiktok: "",
  youtube: "",
  spotify: "",
  soundcloud: "",
  appleMusic: "",
  amazonMusic: "",
  deezer: "",
  pandora: "",
  bandcamp: "",
  interests: "",
  musicalSkills: "",
  otherSkills: "",
  portfolioItems: [],
  error: null,
};

class PublicProfileBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...PROFILE_CONTENT };
  }
  componentDidMount = () => {
    this.showUser();
  };

  showUser = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const user = this.props.firebase.user(authUser.uid);

        user.on("value", (snapshot) => {
          this.setState({
            username: snapshot.val().username,
            location: snapshot.val().location,
            headline: snapshot.val().headline,
            phoneNumber: snapshot.val().phoneNumber,
            publicEmailAddress: snapshot.val().publicEmailAddress,
            website: snapshot.val().website,
            biography: snapshot.val().biography,
            reasonsForJoining_findOpportunities: snapshot.val()
              .reasonsForJoining_findOpportunities,
            reasonsForJoining_connectOthers: snapshot.val()
              .reasonsForJoining_connectOthers,
            reasonsForJoining_offerOpportunities: snapshot.val()
              .reasonsForJoining_offerOpportunities,
            reasonsForJoining_promoteServices: snapshot.val()
              .reasonsForJoining_promoteServices,
            typeOfUserSelection: snapshot.val().typeOfUserSelection,
            facebook: snapshot.val().facebook,
            instagram: snapshot.val().instagram,
            twitter: snapshot.val().twitter,
            linkedin: snapshot.val().linkedin,
            tiktok: snapshot.val().tiktok,
            youtube: snapshot.val().youtube,
            spotify: snapshot.val().spotify,
            soundcloud: snapshot.val().soundcloud,
            appleMusic: snapshot.val().appleMusic,
            amazonMusic: snapshot.val().amazonMusic,
            deezer: snapshot.val().deezer,
            pandora: snapshot.val().pandora,
            bandcamp: snapshot.val().bandcamp,
            interests: snapshot.val().interests,
            musicalSkills: snapshot.val().musicalSkills,
            otherSkills: snapshot.val().otherSkills,
          });
        });
      }
    });
  };
  /*
  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }
  */

  render() {
    const {
      username,
      profilePicture,
      location,
      headline,
      phoneNumber,
      publicEmailAddress,
      reasonsForJoining_findOpportunities,
      reasonsForJoining_connectOthers,
      reasonsForJoining_offerOpportunities,
      reasonsForJoining_promoteServices,
      typeOfUserSelection,
      website,
      biography,
      facebook,
      instagram,
      twitter,
      linkedin,
      tiktok,
      youtube,
      spotify,
      soundcloud,
      appleMusic,
      amazonMusic,
      deezer,
      pandora,
      bandcamp,
      interests,
      musicalSkills,
      otherSkills,
      error,
    } = this.state;

    return (
      <div>
            <span>
              <strong>Username:</strong> {username}
            </span>
            <span>
              <strong>Location:</strong> {location}
            </span>
            <span>
              <strong>Headline:</strong> {headline}
            </span>
            <span>
              <strong>Phone Number:</strong> {phoneNumber}
            </span>
            <span>
              <strong>Email Address:</strong> {publicEmailAddress}
            </span>
            <span>
              <strong>Website:</strong> {website}
            </span>
            <span>
              <strong>Biography:</strong> {biography}
            </span>
            <span>
              <strong>Reasons for Joining:</strong>{" "}
              {reasonsForJoining_findOpportunities}
              {reasonsForJoining_connectOthers}
              {reasonsForJoining_offerOpportunities}
              {reasonsForJoining_promoteServices}
            </span>
            <span>
              <strong>I am a:</strong> {typeOfUserSelection}
            </span>
            <span>
              <strong>Facebook:</strong> {facebook}
            </span>
            <span>
              <strong>Instagram:</strong> {instagram}
            </span>
            <span>
              <strong>Twitter:</strong> {twitter}
            </span>
            <span>
              <strong>LinkedIn:</strong> {linkedin}
            </span>
            <span>
              <strong>TikTok:</strong> {tiktok}
            </span>
            <span>
              <strong>Spotify:</strong> {spotify}
            </span>
            <span>
              <strong>Soundcloud:</strong> {soundcloud}
            </span>
            <span>
              <strong>Apple Music:</strong> {appleMusic}
            </span>
            <span>
              <strong>Amazon Music:</strong> {amazonMusic}
            </span>
            <span>
              <strong>Spotify:</strong> {spotify}
            </span>
            <span>
              <strong>Deezer:</strong> {deezer}
            </span>
            <span>
              <strong>Pandora:</strong> {pandora}
            </span>
            <span>
              <strong>Bandcamp:</strong> {bandcamp}
            </span>
            <span>
              <strong>Interests:</strong> {interests}
            </span>
            <span>
              <strong>Musical Skills:</strong> {musicalSkills}
            </span>
            <span>
              <strong>Non-Musical Skills:</strong> {otherSkills}
            </span>
              {/*
              <button
                type="button"
                onClick={this.onSendConnectionRequest}
              >
                Send Connection Request
              */}
      </div>
    );
  }
}


const PublicProfile = withFirebase(PublicProfileBase);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(PublicProfilePage);
