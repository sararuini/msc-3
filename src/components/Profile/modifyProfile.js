import React, { Component } from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";

import { withFirebase } from "../Firebase";
import { View, Text } from "react-native-web";
//import page_styles from "./styles";
import page_styles_template from '../StyleTemplate';

//page displaying 'modify profile'
const ModifyProfilePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Text>
          Edit Profile: {authUser.username}
        </Text>
        <ModifyProfile authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const PROFILE_CONTENT = {
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

class ModifyProfileBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...PROFILE_CONTENT };
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  componentDidMount = () => {
    this.showUser();
  };

  showUser = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const user = this.props.firebase.user(authUser.uid);

        user.on("value", (snapshot) => {
          this.setState({
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

  onSubmit = (event) => {
    const {
      profilePicture,
      location,
      headline,
      phoneNumber,
      publicEmailAddress,
      website,
      reasonsForJoining_findOpportunities,
      reasonsForJoining_connectOthers,
      reasonsForJoining_offerOpportunities,
      reasonsForJoining_promoteServices,
      typeOfUserSelection,
      biography,
      portfolioItems,
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
    } = this.state;

    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const user = this.props.firebase.user(authUser.uid);
        let newPost = user.push().key;

        const processUpdates = (newPost) => {
          const updates = {};

          if (user.location !== location) {
            updates["location"] = location;
          }

          if (user.headline !== headline) {
            updates["headline"] = headline;
          }

          if (user.website !== website) {
            updates["website"] = website;
          }

          if (user.phoneNumber !== phoneNumber) {
            updates["phoneNumber"] = phoneNumber;
          }

          if (
            user.publicEmailAddress !== publicEmailAddress
          ) {
            updates["publicEmailAddress"] = publicEmailAddress;
          }

          if (
            user.reasonsForJoining_findOpportunities !==
              reasonsForJoining_findOpportunities
          ) {
            updates[
              "reasonsForJoining_findOpportunities"
            ] = reasonsForJoining_findOpportunities;
          }

          if (
            user.reasonsForJoining_connectOthers !==
              reasonsForJoining_connectOthers
          ) {
            updates[
              "reasonsForJoining_connectOthers"
            ] = reasonsForJoining_connectOthers;
          }

          if (
            user.reasonsForJoining_offerOpportunities !==
              reasonsForJoining_offerOpportunities
          ) {
            updates[
              "reasonsForJoining_offerOpportunities"
            ] = reasonsForJoining_offerOpportunities;
          }

          if (
            user.reasonsForJoining_promoteServices !==
              reasonsForJoining_promoteServices
          ) {
            updates[
              "reasonsForJoining_promoteServices"
            ] = reasonsForJoining_promoteServices;
          }

          if (
            user.typeOfUserSelection !== typeOfUserSelection
          ) {
            updates["typeOfUserSelection"] = typeOfUserSelection;
          }

          if (user.biography !== biography) {
            updates["biography"] = biography;
          }

          if (user.facebook !== facebook) {
            updates["facebook"] = facebook;
          }
          if (user.instagram !== instagram) {
            updates["instagram"] = instagram;
          }

          if (user.twitter !== twitter) {
            updates["twitter"] = twitter;
          }
          if (user.linkedin !== linkedin) {
            updates["linkedin"] = linkedin;
          }
          if (user.tiktok !== tiktok) {
            updates["tiktok"] = tiktok;
          }
          if (user.youtube !== youtube) {
            updates["youtube"] = youtube;
          }
          if (user.spotify !== spotify) {
            updates["spotify"] = spotify;
          }
          if (user.soundcloud !== soundcloud) {
            updates["soundcloud"] = soundcloud;
          }
          if (user.appleMusic !== appleMusic) {
            updates["appleMusic"] = appleMusic;
          }

          if (user.amazonMusic !== amazonMusic) {
            updates["amazonMusic"] = amazonMusic;
          }
          if (user.deezer !== deezer) {
            updates["deezer"] = deezer;
          }
          if (user.pandora !== pandora) {
            updates["pandora"] = pandora;
          }
          if (user.bandcamp !== bandcamp) {
            updates["bandcamp"] = bandcamp;
          }

          if (user.interests !== interests && interests !== "") {
            updates["interests"] = interests;
          }

          if (user.musicalSkills !== musicalSkills && musicalSkills !== "") {
            updates["musicalSkills"] = musicalSkills;
          }

          if (user.otherSkills !== otherSkills && otherSkills !== "") {
            updates["otherSkills"] = otherSkills;
          }

          return user.update(updates);
        };

        processUpdates(newPost)
          .then(function (snapshot) {
            let data = snapshot.val();
          })
          .then(() => {
            this.setState({ ...PROFILE_CONTENT });
          })
          .catch((error) => {
            this.setState({ error });
          });
      }
    });

    event.preventDefault();
  };

  render() {
    const {
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
      <View style={page_styles_template.main_page}>
        <div>
          {/* Profile picture here */}
          <form onSubmit={this.onSubmit}>
            <View >
              <Text>Profile Picture</Text>
              <Text>Headline</Text>
              <input
                type="text"
                id="headline"
                name="headline"
                value={headline}
                onChange={this.onChange}
                placeholder="Headline"
              />
              <Text>Location</Text>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={this.onChange}
                placeholder="Location"
              />

              <Text>Biography</Text>
              <input
                type="textarea"
                id="biography"
                name="biography"
                value={biography}
                onChange={this.onChange}
                placeholder="Biography"
              />
            </View>

            <View>
              <Text>Public Contact Details</Text>
              <label htmlFor="publicEmailAddress">Email Address</label>
              <input
                type="publicEmailAddress"
                value={publicEmailAddress}
                id="publicEmailAddress"
                name="publicEmailAddress"
                onChange={this.onChange}
                placeholder="Email Address"
              />

              <label htmlFor="phone">Phone Number</label>
              <input
                name="phoneNumber"
                value={phoneNumber}
                type="tel"
                onChange={this.onChange}
                id="phone"
                placeholder="Phone Number"
              />

              <label htmlFor="website">Personal Website</label>
              <input
                name="website"
                value={website}
                type="url"
                onChange={this.onChange}
                id="website"
                placeholder="Website"
              />
            </View>

            <View>
              <Text>
                Social Media and Music Profiles
              </Text>
              <Text>Facebook</Text>
              <input
                type="textarea"
                id="facebook"
                name="facebook"
                value={facebook}
                onChange={this.onChange}
                placeholder="Facebook"
              />
              <Text>Instagram</Text>
              <input
                type="textarea"
                id="instagram"
                name="instagram"
                value={instagram}
                onChange={this.onChange}
                placeholder="Instagram"
              />
              <Text>Twitter</Text>
              <input
                type="textarea"
                id="twitter"
                name="twitter"
                value={twitter}
                onChange={this.onChange}
                placeholder="twitter"
              />
              <Text>LinkedIn</Text>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={linkedin}
                onChange={this.onChange}
                placeholder="linkedin"
              />
              <Text>TikTok</Text>
              <input
                type="textarea"
                id="tiktok"
                name="tiktok"
                value={tiktok}
                onChange={this.onChange}
                placeholder="TikTok"
              />
              <Text>YouTube</Text>
              <input
                type="url"
                id="youtube"
                name="youtube"
                value={youtube}
                onChange={this.onChange}
                placeholder="YouTube"
              />
              <Text>Spotify</Text>
              <input
                type="url"
                id="spotify"
                name="spotify"
                value={spotify}
                onChange={this.onChange}
                placeholder="Spotify"
              />
              <Text>SoundCloud</Text>
              <input
                type="url"
                id="soundcloud"
                name="soundcloud"
                value={soundcloud}
                onChange={this.onChange}
                placeholder="SoundCloud"
              />
              <Text>Apple Music</Text>
              <input
                type="url"
                id="appleMusic"
                name="appleMusic"
                value={appleMusic}
                onChange={this.onChange}
                placeholder="Apple Music"
              />
              <Text>Amazon Music</Text>
              <input
                type="url"
                id="amazonMusic"
                name="amazonMusic"
                value={amazonMusic}
                onChange={this.onChange}
                placeholder="Amazon Music"
              />
              <Text>Deezer</Text>
              <input
                type="url"
                id="deezer"
                name="deezer"
                value={deezer}
                onChange={this.onChange}
                placeholder="Deezer"
              />
              <Text>Pandora</Text>
              <input
                type="textarea"
                id="pandora"
                name="pandora"
                value={pandora}
                onChange={this.onChange}
                placeholder="Pandora"
              />
              <Text>BandCamp</Text>
              <input
                type="textarea"
                id="bandcamp"
                name="bandcamp"
                value={bandcamp}
                onChange={this.onChange}
                placeholder="BandCamp"
              />
            </View>
            <View >
              <View>
                <Text>
                  {" "}
                  Why did you join music connector?
                </Text>

                <View>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_connectOthers"
                    id="reasonsForJoining_connectOthers"
                    checked={reasonsForJoining_connectOthers}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_connectOthers">
                    <Text>
                      Connect with others
                    </Text>
                  </label>
                </View>

                <View>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_findOpportunities"
                    id="reasonsForJoining_findOpportunities"
                    checked={reasonsForJoining_findOpportunities}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_findOpportunities">
                    <Text>
                      Find new opportunities
                    </Text>
                  </label>
                </View>

                <View>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_promoteServices"
                    id="reasonsForJoining_promoteServices"
                    checked={reasonsForJoining_promoteServices}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_promoteServices">
                    <Text>
                      Promote my Services and/or my work
                    </Text>
                  </label>
                </View>
                <View>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_offerOpportunities"
                    id="reasonsForJoining_offerOpportunities"
                    checked={reasonsForJoining_offerOpportunities}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_offerOpportunities">
                    <Text>
                      Offer Opportunities
                    </Text>
                  </label>
                  <View>
                    <Text>Skills & Interests</Text>
                    <Text>Interests</Text>
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={interests}
                      onChange={this.onChange}
                      placeholder="Interests"
                    />

                    <Text>Musical Skills</Text>
                    <input
                      type="text"
                      id="musicalSkills"
                      name="musicalSkills"
                      value={musicalSkills}
                      onChange={this.onChange}
                      placeholder="Musical Skills"
                    />

                    <Text>Non-Musical Skills</Text>
                    <input
                      type="text"
                      id="otherSkills"
                      name="otherSkills"
                      value={otherSkills}
                      onChange={this.onChange}
                      placeholder="otherSkills"
                    />
                  </View>
                </View>
              </View>
            </View>

            <View>
              <label>
                <Text>Are you a ...</Text>
                <select
                  defaultValue={typeOfUserSelection}
                  onChange={this.onChange}
                >
                  <option value="professional">
                    Music Industry Professional
                  </option>
                  <option value="musician">Musician</option>
                  <option value="musician-professional">Both</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </View>

            <View>
              <button type="submit">Save Profile</button>
            </View>
          </form>
        </div>
      </View>
    );
  }
}

const ModifyProfile = withFirebase(ModifyProfileBase);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ModifyProfilePage);
