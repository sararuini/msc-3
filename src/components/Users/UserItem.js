import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { View, Text,  } from "react-native-web";
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

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      username: "",
      pendingConnection: false,
      existingFriendship: false,
      previousKey: "",
      isUserPage: false,
      timestamp: "",
      ...props.location.state,
    };
  }


  componentDidMount () {
    // checks if the two users involved are connections already
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const userProfileId = this.props.match.params.id;
        const currentUserId = currentUser.uid;

        if (userProfileId === currentUserId) {
          this.setState({
            isUserPage: true,
          });
          console.log("isUserPage " + this.state.isUserPage);
        }

        this.props.firebase
          .userConnections(currentUserId)
          .once("value")
          .then((snapshot) => {
            const connectionObj = snapshot.val();
            console.log("connection obj" + connectionObj);
            if (connectionObj) {
              for (const connectionObjId in connectionObj) {
                if (connectionObj.hasOwnProperty(connectionObjId)) {
                  console.log("connection id " + connectionObjId);
                  const connection = connectionObj[connectionObjId];
                  const connectedUser = connection.user;

                  console.log("connected user " + connectedUser);
                  if (userProfileId === connectedUser) {
                    this.setState({ existingFriendship: true });
                  }
                }
              }
            }
          });

        // checks if either sender or receiver has sent a connection request
        this.props.firebase
          .pendingConnections()
          .once("value")
          .then((snapshot) => {
            const pendingConnectionObj = snapshot.val();
            console.log("pending obj " + pendingConnectionObj);
            if (pendingConnectionObj) {
              for (const pendingConnectionObjId in pendingConnectionObj) {
                if (
                  pendingConnectionObj.hasOwnProperty(pendingConnectionObjId)
                ) {
                  console.log("pending connection id" + pendingConnectionObjId);
                  const pendingConnection =
                    pendingConnectionObj[pendingConnectionObjId];
                  const receiver = pendingConnection.receiverId;
                  const sender = pendingConnection.senderId;
                  console.log("pending receiver" + receiver);
                  console.log("pending sender" + sender);

                  if (currentUserId === sender || currentUserId === receiver) {
                    this.setState({ pendingConnection: true });
                  }
                  // accept and decline buttons here
                }
              }
            }
          });

          if (this.state.user) {
            return;
          }
          this.setState({ loading: true });
        this.props.firebase
          .user(this.props.match.params.id)
          .on("value", (snapshot) => {
            this.setState({
              user: snapshot.val(),
              loading: false,
            });
            console.log("this.state.user" + this.state.user);
            console.log("this.state.user" + currentUser);
            
          });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  sendConnectionRequest = () => {
    const receiverId = this.props.match.params.id;
    const sender = this.props.firebase.auth.currentUser;
    const senderId = sender.uid;
    const newRef = this.props.firebase.pendingConnections().push();
    const newRefKey = newRef.key;

    if (this.state.pendingConnection === false) {
      newRef.set({
        senderId: senderId,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
        receiverId: receiverId,
      });

      this.setState({ previousKey: newRefKey, pendingConnection: true });
      console.log("request sent");
      console.log(newRefKey);
    }

    this.props.firebase.notifications(receiverId).push(
      {
        type: "Connection Request Received",
        senderId: sender.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      }
    )
  };

  render() {
    const {
      user,
      loading,
      existingFriendship,
      pendingConnection,
      isUserPage,
    } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}


        {user && ( 
        <View>
        <div>
          <View style={page_styles.whole_page}>
          <Text style={page_styles.header}>{user.username}</Text>
            <div>
            <Text style={page_styles.header}>Profile Info</Text>

                <View style={page_styles.align_icon}>
                  <ShortTextIcon />
                  <Text style={page_styles.normal_text}>Headline: {user.headline}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <LocationCityIcon />
                  <Text style={page_styles.normal_text}>Location: {user.location}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <ViewHeadlineIcon />
                  <Text style={page_styles.normal_text}>Biography: {user.biography}</Text>
                </View>
                <View>
                <Text style={page_styles.header}>Public Contact Details </Text>

                <View style={page_styles.align_icon}>
                  <EmailIcon />
                  <Text style={page_styles.normal_text}>Email Address: {user.publicEmailAddress}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <PhoneIcon />
                  <Text style={page_styles.normal_text}>Phone Number: {user.phoneNumber}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <LinkIcon />
        <Text style={page_styles.normal_text}>Personal Website: {user.website}</Text>
                </View>
                <Text style={page_styles.header}>
                  Social Media and Music Profiles
                </Text>
                <View style={page_styles.align_icon}>
                  <FacebookIcon />
                  <Text style={page_styles.normal_text}>Facebook: {user.facebook}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <InstagramIcon />
                  <Text style={page_styles.normal_text}>Instagram {user.instagram} </Text>
                </View>
                <View style={page_styles.align_icon}>
                  <TwitterIcon />
                  <Text style={page_styles.normal_text}>Twitter {user.twitter}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <LinkedInIcon />
                  <Text style={page_styles.normal_text}>LinkedIn: {user.linkedin}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <SiTiktok />
                  <Text style={page_styles.normal_text}>TikTok: {user.tiktok}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <YouTubeIcon />
                  <Text style={page_styles.normal_text}>YouTube: {user.youtube}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <FaSpotify />
                  <Text style={page_styles.normal_text}>Spotify: {user.spotify}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <SiSoundcloud />
                  <Text style={page_styles.normal_text}>SoundCloud: {user.soundcloud}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <FaApple />
                  <Text style={page_styles.normal_text}>Apple Music: {user.appleMusic}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <FaAmazon />
                  <Text style={page_styles.normal_text}>Amazon Music: {user.amazonMusic}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <SiDeezer />
                  <Text style={page_styles.normal_text}>Deezer: {user.deezer}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <SiPandora />
                  <Text style={page_styles.normal_text}>Pandora: {user.pandora}</Text>
                </View>
                <View style={page_styles.align_icon}>
                  <SiBandcamp />
                  <Text style={page_styles.normal_text}>BandCamp: {user.bandcamp}</Text>
                </View>
                <View style={page_styles.align_icon}>
                <Text style={page_styles.header}>
                    Why did you join music connector?
                  </Text>
                      <Text style={page_styles.checkbox_text}>
                        Connect with others: {user.reasonsForJoining_connectOthers}
                      </Text>
                      <Text style={page_styles.checkbox_text}>
                      Find new opportunities: {user.reasonsForJoining_findOpportunities}
                      </Text>
                      <Text style={page_styles.checkbox_text}>
                      Promote my Services and/or my work: {user.reasonsForJoining_promoteServices}
                      </Text>
                      <Text style={page_styles.checkbox_text}>
                        Offer Opportunities: {user.reasonsForJoining_offerOpportunities}
                      </Text>
                  </View>
                  <Text style={page_styles.header}>Skills & Interests</Text>
                  <View style={page_styles.align_icon}>
                        <FaHeart />
                        <Text style={page_styles.normal_text}>
                          Interests and Hobbies: {user.interests}
                        </Text>
                  </View>
                  <View style={page_styles.align_icon}>
                        <FaGuitar />
                        <Text style={page_styles.normal_text}>
                          Musical Skills: {user.musicalSkills}
                        </Text>
                      </View>
                      <View style={page_styles.align_icon}>
                        <FaPencilRuler />
                        <Text style={page_styles.normal_text}>
                          Non-Musical Skills: {user.otherSkills}
                        </Text>
                      </View>

              </View>
            </div>
          </View>
          </div>
        </View>
        )}
          

        {existingFriendship === false &&
          pendingConnection === false &&
          isUserPage === false && (
            <span>
              <form>
                {/*
              <input
                type="text"
                value={requestMessage}
                name="requestMessage"
                placeholder="Message to user"
                onChange={this.writeRequestMessage}
              />
               */}
                <button
                  type="submit"
                  onClick={() => {
                    this.sendConnectionRequest();
                    //this.toggleHidden();
                  }}
                >
                  Send Connection Request
                </button>
              </form>
            </span>
          )}
      </div>
    );
  }
}

export default withFirebase(UserItem);