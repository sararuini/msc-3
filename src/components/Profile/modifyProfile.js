import React, { Component } from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";

import { withFirebase } from "../Firebase";
import { View, Text } from "react-native-web";
import page_styles from "./styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LinkIcon from "@material-ui/icons/Link";
import ShortTextIcon from "@material-ui/icons/ShortText";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import { FaSpotify, FaApple, FaGuitar, FaHeart, FaHammer, FaAmazon } from 'react-icons/fa';
import { SiTiktok, SiSoundcloud, SiDeezer, SiPandora, SiBandcamp} from "react-icons/si";



//page displaying 'modify profile'
const ModifyProfilePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Text>Edit Profile: {authUser.username}</Text>
        <ModifyProfile authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const PROFILE_CONTENT = {
  profilePictureUpload: "",
  profilePictureUrl: "",
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

  handleImageAsFile = (event) => {
    const profilePicture = event.target.files[0];
    this.setState({ profilePictureUpload: profilePicture });
  };

  handleFirebaseUpload = (event) => {
    event.preventDefault();
    console.log("start of upload");
    if (this.state.profilePictureUpload === "") {
      console.log("not an image");
    }
    const picUpload = this.state.profilePictureUpload;
    const uploadRef = this.props.firebase.userProfilePicture(picUpload.name);
    const uploadTask = uploadRef.put(picUpload);
    const download = uploadRef.getDownloadURL();
    this.setState({ profilePictureUrl: download });
  };

  /*
  componentWillUnmount = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userId = this.props.firebase.user(authUser.uid);
        this.props.firebase.user(userId).off()
      }
    })
  }
  */

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

          if (user.publicEmailAddress !== publicEmailAddress) {
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

          if (user.typeOfUserSelection !== typeOfUserSelection) {
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
      profilePictureUpload,
      profilePictureUrl,
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
      <View>
        <div>
          <View>
            <div>
              <form onSubmit={this.handleFirebaseUpload}>
                <Text>Profile Picture</Text>
                <input
                  type="file"
                  value={profilePictureUpload}
                  placeholder="Profile Picture"
                  onChange={this.handleImageAsFile}
                />
                <button type="submit">Upload Profile Picture</button>
              </form>
            </div>
          </View>

          <View style={page_styles.whole_page}>
            <form onSubmit={this.onSubmit}>
              <View>
                <Text style={page_styles.header}>Profile Info</Text>
                <Text style={page_styles.normal_text}>Headline</Text>
                <ShortTextIcon />
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  value={headline}
                  onChange={this.onChange}
                  placeholder="Headline"
                />
                <Text style={page_styles.normal_text}>Location</Text>
                <LocationCityIcon />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  placeholder="Location"
                />

                <Text style={page_styles.normal_text}>Biography</Text>
                <ViewHeadlineIcon />
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
                <Text style={page_styles.header}>Public Contact Details </Text>
                <Text style={page_styles.normal_text}>Email Address</Text>
                <EmailIcon />
                <input
                  type="publicEmailAddress"
                  value={publicEmailAddress}
                  id="publicEmailAddress"
                  name="publicEmailAddress"
                  onChange={this.onChange}
                  placeholder="Email Address"
                />

                <Text style={page_styles.normal_text}>Phone Number</Text>
                <PhoneIcon />
                <input
                  name="phoneNumber"
                  value={phoneNumber}
                  type="tel"
                  onChange={this.onChange}
                  id="phone"
                  placeholder="Phone Number"
                />

                <Text style={page_styles.normal_text}>Personal Website</Text>
                <LinkIcon />
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
                <Text style={page_styles.header}>
                  Social Media and Music Profiles
                </Text>
                <Text style={page_styles.normal_text}>Facebook</Text>
                <FacebookIcon />
                <input
                  type="textarea"
                  id="facebook"
                  name="facebook"
                  value={facebook}
                  onChange={this.onChange}
                  placeholder="Facebook"
                />
                <Text style={page_styles.normal_text}>Instagram</Text>
                <InstagramIcon />
                <input
                  type="textarea"
                  id="instagram"
                  name="instagram"
                  value={instagram}
                  onChange={this.onChange}
                  placeholder="Instagram"
                />
                <Text style={page_styles.normal_text}>Twitter</Text>
                <TwitterIcon />
                <input
                  type="textarea"
                  id="twitter"
                  name="twitter"
                  value={twitter}
                  onChange={this.onChange}
                  placeholder="twitter"
                />
                <Text style={page_styles.normal_text}>LinkedIn</Text>
                <LinkedInIcon />
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={linkedin}
                  onChange={this.onChange}
                  placeholder="linkedin"
                />
                <Text style={page_styles.normal_text}>TikTok</Text>
                <SiTiktok />
                <input
                  type="textarea"
                  id="tiktok"
                  name="tiktok"
                  value={tiktok}
                  onChange={this.onChange}
                  placeholder="TikTok"
                />
                <Text style={page_styles.normal_text}>YouTube</Text>
                <YouTubeIcon />
                <input
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={youtube}
                  onChange={this.onChange}
                  placeholder="YouTube"
                />
                <Text style={page_styles.normal_text}>Spotify</Text>
                <FaSpotify />
                <input
                  type="url"
                  id="spotify"
                  name="spotify"
                  value={spotify}
                  onChange={this.onChange}
                  placeholder="Spotify"
                />
                <Text style={page_styles.normal_text}>SoundCloud</Text>
                <SiSoundcloud />
                <input
                  type="url"
                  id="soundcloud"
                  name="soundcloud"
                  value={soundcloud}
                  onChange={this.onChange}
                  placeholder="SoundCloud"
                />
                <Text style={page_styles.normal_text}>Apple Music</Text>
                <FaApple />
                <input
                  type="url"
                  id="appleMusic"
                  name="appleMusic"
                  value={appleMusic}
                  onChange={this.onChange}
                  placeholder="Apple Music"
                />
                <Text style={page_styles.normal_text}>Amazon Music</Text>
                <FaAmazon />
                <input
                  type="url"
                  id="amazonMusic"
                  name="amazonMusic"
                  value={amazonMusic}
                  onChange={this.onChange}
                  placeholder="Amazon Music"
                />
                <Text style={page_styles.normal_text}>Deezer</Text>
                <SiDeezer />
                <input
                  type="url"
                  id="deezer"
                  name="deezer"
                  value={deezer}
                  onChange={this.onChange}
                  placeholder="Deezer"
                />
                <Text style={page_styles.normal_text}>Pandora</Text>
                <SiPandora />
                <input
                  type="textarea"
                  id="pandora"
                  name="pandora"
                  value={pandora}
                  onChange={this.onChange}
                  placeholder="Pandora"
                />
                <Text style={page_styles.normal_text}>BandCamp</Text>
               <SiBandcamp />
                <input
                  type="textarea"
                  id="bandcamp"
                  name="bandcamp"
                  value={bandcamp}
                  onChange={this.onChange}
                  placeholder="BandCamp"
                />
              </View>
              <View>
                <View>
                  <Text style={page_styles.header}>
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
                      <Text style={page_styles.normal_text}>
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
                      <Text style={page_styles.normal_text}>
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
                      <Text style={page_styles.normal_text}>
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
                      <Text style={page_styles.normal_text}>
                        Offer Opportunities
                      </Text>
                    </label>

                    <View>
                      <Text style={page_styles.header}>Skills & Interests</Text>
                      <Text style={page_styles.normal_text}>Interests</Text>
                      <FaHeart />
                      <input
                        type="text"
                        id="interests"
                        name="interests"
                        value={interests}
                        onChange={this.onChange}
                        placeholder="Interests"
                      />

                      <Text style={page_styles.normal_text}>
                        <FaGuitar />
                        Musical Skills
                      </Text>
                      <input
                        type="text"
                        id="musicalSkills"
                        name="musicalSkills"
                        value={musicalSkills}
                        onChange={this.onChange}
                        placeholder="Musical Skills"
                      />

                      <Text style={page_styles.normal_text}>
                      <FaHammer />
                        Non-Musical Skills
                      </Text>
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
                <button type="submit">Save Profile</button>
              </View>
            </form>
          </View>
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

/* Source for uploading files: 
https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj

*/
