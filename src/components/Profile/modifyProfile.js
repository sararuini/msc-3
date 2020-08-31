import React, { Component } from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";

import { withFirebase } from "../Firebase";
import { View, Text, TextInput, CheckBox } from "react-native-web";
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
import {
  FaSpotify,
  FaApple,
  FaGuitar,
  FaHeart,
  FaPencilRuler,
  FaAmazon,
  FaImage,
} from "react-icons/fa";
import {
  SiTiktok,
  SiSoundcloud,
  SiDeezer,
  SiPandora,
  SiBandcamp,
} from "react-icons/si";

//page displaying 'modify profile'
const ModifyProfilePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <View style={{ alignItems: "center" }}>
          <div>
            <Text style={page_styles.title}>
              Edit Profile: {authUser.username}
            </Text>
          </div>
        </View>
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
          <View style={page_styles.whole_page}>
            <Text style={page_styles.header}>Profile Info</Text>
            <div>
              <form onSubmit={this.handleFirebaseUpload}>
                <View style={page_styles.align_icon}>
                  <FaImage />
                  <Text style={page_styles.normal_text}>Profile Picture</Text>
                </View>
                <input
                  type="file"
                  value={profilePictureUpload}
                  placeholder="Profile Picture"
                  onChange={this.handleImageAsFile}
                />
                <button type="submit">Upload Profile Picture</button>
              </form>
            </div>

            <form onSubmit={this.onSubmit}>
              <View>
                <View style={page_styles.align_icon}>
                  <ShortTextIcon />
                  <Text style={page_styles.normal_text}>Headline</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Tell us a few things about yourself"
                  value={headline}
                  nativeID="headline"
                  blurOnSubmit="false"
                  onChangeText={(headline) => this.setState({ headline })}
                />

                <View style={page_styles.align_icon}>
                  <LocationCityIcon />
                  <Text style={page_styles.normal_text}>Location</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="City or country you live in"
                  value={location}
                  nativeID="location"
                  blurOnSubmit="false"
                  onChangeText={(location) => this.setState({ location })}
                />

                <View style={page_styles.align_icon}>
                  <ViewHeadlineIcon />
                  <Text style={page_styles.normal_text}>Biography</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Share anything you want - from your work history to your goals for the future"
                  value={biography}
                  nativeID="biography"
                  blurOnSubmit="false"
                  multiline="true"
                  numberOfLines= "3"
                  onChangeText={(biography) => this.setState({ biography })}
                />
              </View>

              <View>
                <Text style={page_styles.header}>Public Contact Details </Text>

                <View style={page_styles.align_icon}>
                  <EmailIcon />
                  <Text style={page_styles.normal_text}>Email Address</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Email Address"
                  value={publicEmailAddress}
                  nativeID="publicEmailAddress"
                  blurOnSubmit="false"
                  keyboardType="email-address"
                  onChangeText={(publicEmailAddress) =>
                    this.setState({ publicEmailAddress })
                  }
                />

                <View style={page_styles.align_icon}>
                  <PhoneIcon />
                  <Text style={page_styles.normal_text}>Phone Number</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  nativeID="phoneNumber"
                  blurOnSubmit="false"
                  keyboardType="phone-pad"
                  onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                />

                <View style={page_styles.align_icon}>
                  <LinkIcon />
                  <Text style={page_styles.normal_text}>Personal Website</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Personal Website"
                  value={website}
                  nativeID="website"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(website) => this.setState({ website })}
                />
              </View>

              <View>
                <Text style={page_styles.header}>
                  Social Media and Music Profiles
                </Text>

                <View style={page_styles.align_icon}>
                  <FacebookIcon />
                  <Text style={page_styles.normal_text}>Facebook</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Facebook Page"
                  value={facebook}
                  nativeID="facebook"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(facebook) => this.setState({ facebook })}
                />

                <View style={page_styles.align_icon}>
                  <InstagramIcon />
                  <Text style={page_styles.normal_text}>Instagram</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Instagram Profile"
                  value={instagram}
                  nativeID="instagram"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(instagram) => this.setState({ instagram })}
                />

                <View style={page_styles.align_icon}>
                  <TwitterIcon />
                  <Text style={page_styles.normal_text}>Twitter</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Twitter Profile"
                  value={twitter}
                  nativeID="twitter"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(twitter) => this.setState({ twitter })}
                />

                <View style={page_styles.align_icon}>
                  <LinkedInIcon />
                  <Text style={page_styles.normal_text}>LinkedIn</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to LinkedIn Profile"
                  value={linkedin}
                  nativeID="linkedin"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(linkedin) => this.setState({ linkedin })}
                />

                <View style={page_styles.align_icon}>
                  <SiTiktok />
                  <Text style={page_styles.normal_text}>TikTok</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to TikTok Profile"
                  value={tiktok}
                  nativeID="tiktok"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(tiktok) => this.setState({ tiktok })}
                />

                <View style={page_styles.align_icon}>
                  <YouTubeIcon />
                  <Text style={page_styles.normal_text}>YouTube</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to YouTube Profile"
                  value={youtube}
                  nativeID="youtube"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(youtube) => this.setState({ youtube })}
                />

                <View style={page_styles.align_icon}>
                  <FaSpotify />
                  <Text style={page_styles.normal_text}>Spotify</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Spotify Artist Profile"
                  value={spotify}
                  nativeID="spotify"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(spotify) => this.setState({ spotify })}
                />

                <View style={page_styles.align_icon}>
                  <SiSoundcloud />
                  <Text style={page_styles.normal_text}>SoundCloud</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Soundcloud Artist Profile"
                  value={soundcloud}
                  nativeID="soundcloud"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(soundcloud) => this.setState({ soundcloud })}
                />

                <View style={page_styles.align_icon}>
                  <FaApple />
                  <Text style={page_styles.normal_text}>Apple Music</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Apple Music Artist Profile"
                  value={appleMusic}
                  nativeID="appleMusic"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(appleMusic) => this.setState({ appleMusic })}
                />

                <View style={page_styles.align_icon}>
                  <FaAmazon />
                  <Text style={page_styles.normal_text}>Amazon Music</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Amazon Music Artist Profile"
                  value={amazonMusic}
                  nativeID="amazonMusic"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(amazonMusic) => this.setState({ amazonMusic })}
                />

                <View style={page_styles.align_icon}>
                  <SiDeezer />
                  <Text style={page_styles.normal_text}>Deezer</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Deezer Artist Profile"
                  value={deezer}
                  nativeID="deezer"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(deezer) => this.setState({ deezer })}
                />

                <View style={page_styles.align_icon}>
                  <SiPandora />
                  <Text style={page_styles.normal_text}>Pandora</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to Pandora Artist Profile"
                  value={pandora}
                  nativeID="pandora"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(pandora) => this.setState({ pandora })}
                />

                <View style={page_styles.align_icon}>
                  <SiBandcamp />
                  <Text style={page_styles.normal_text}>BandCamp</Text>
                </View>

                <TextInput
                  style={page_styles.text_input}
                  placeholder="Link to BandCamp Artist Profile"
                  value={bandcamp}
                  nativeID="bandcamp"
                  blurOnSubmit="false"
                  keyboardType="url"
                  onChangeText={(bandcamp) => this.setState({ bandcamp })}
                />
              </View>

              <View>
                  <Text style={page_styles.header}>
                    Why did you join music connector?
                  </Text>

                  <View style={page_styles.align_icon}>
                    <input
                      type="checkbox"
                      name="reasonsForJoining_connectOthers"
                      id="reasonsForJoining_connectOthers"
                      checked={reasonsForJoining_connectOthers}
                      onChange={this.onChangeCheckbox}
                    />
                    <label htmlFor="reasonsForJoining_connectOthers">
                      <Text style={page_styles.checkbox_text}>
                        Connect with others
                      </Text>
                    </label>
                  </View>

                  <View style={page_styles.align_icon}>
                    <input
                      type="checkbox"
                      name="reasonsForJoining_findOpportunities"
                      id="reasonsForJoining_findOpportunities"
                      checked={reasonsForJoining_findOpportunities}
                      onChange={this.onChangeCheckbox}
                    />
                    <label htmlFor="reasonsForJoining_findOpportunities">
                      <Text style={page_styles.checkbox_text}>
                        Find new opportunities
                      </Text>
                    </label>
                  </View>

                  <View style={page_styles.align_icon}>
                    <input
                      type="checkbox"
                      name="reasonsForJoining_promoteServices"
                      id="reasonsForJoining_promoteServices"
                      checked={reasonsForJoining_promoteServices}
                      onChange={this.onChangeCheckbox}
                    />
                    <label htmlFor="reasonsForJoining_promoteServices">
                      <Text style={page_styles.checkbox_text}>
                        Promote my Services and/or my work
                      </Text>
                    </label>
                  </View>

                  <View style={page_styles.align_icon}>
                    <input
                      type="checkbox"
                      name="reasonsForJoining_offerOpportunities"
                      id="reasonsForJoining_offerOpportunities"
                      checked={reasonsForJoining_offerOpportunities}
                      onChange={this.onChangeCheckbox}
                    />
                    <label htmlFor="reasonsForJoining_offerOpportunities">
                      <Text style={page_styles.checkbox_text}>
                        Offer Opportunities
                      </Text>
                    </label>
                    </View>

                    <View>
                      <Text style={page_styles.header}>Skills & Interests</Text>

                      <View style={page_styles.align_icon}>
                        <FaHeart />
                        <Text style={page_styles.normal_text}>
                          Interests and Hobbies
                        </Text>
                      </View>

                      <TextInput
                        style={page_styles.text_input}
                        placeholder="What do you like to do in your free time?"
                        value={interests}
                        nativeID="interests"
                        blurOnSubmit="false"
                        onChangeText={(interests) =>
                          this.setState({ interests })
                        }
                      />

                      <View style={page_styles.align_icon}>
                        <FaGuitar />
                        <Text style={page_styles.normal_text}>
                          Musical Skills
                        </Text>
                      </View>

                      <TextInput
                        style={page_styles.text_input}
                        placeholder="Musical instruments, music production, etc."
                        value={musicalSkills}
                        nativeID="musicalSkills"
                        blurOnSubmit="false"
                        onChangeText={(musicalSkills) =>
                          this.setState({ musicalSkills })
                        }
                      />

                      <View style={page_styles.align_icon}>
                        <FaPencilRuler />
                        <Text style={page_styles.normal_text}>
                          Non-Musical Skills
                        </Text>
                      </View>
                      <View style={page_styles.view_space}>
                        <TextInput
                          style={page_styles.text_input}
                          placeholder="Skills that have nothing to do with music - e.g. events management, music publishing, etc."
                          value={otherSkills}
                          nativeID="otherSkills"
                          blurOnSubmit="false"
                          onChangeText={(otherSkills) =>
                            this.setState({ otherSkills })
                          }
                        />
                      </View>
                    </View>
                
              </View>
              <button type="submit">Save Profile</button>
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
