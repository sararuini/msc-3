import React, { Component } from "react";
import page_styles_template from "../StyleTemplate";
import { View, Text } from "react-native-web";
import { withFirebase } from "../Firebase";

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
          <View style={page_styles_template.main_page}>
            <div>
              {user.username}
              <span>
                <strong>Location</strong>
                {user.location}
              </span>
              <span>
                <strong>Headline</strong>
                {user.headline}
              </span>
              <span>
                <strong>Phone Number</strong>
                {user.phoneNumber}
              </span>
              <span>
                <strong>Email</strong>
                {user.publicEmailAddress}
              </span>
              <span>
                <strong>Website</strong>
                {user.website}
              </span>
              <span>
                <strong>Biography</strong>
                {user.biography}
              </span>
              <span>
                <strong>Reasons for Joining</strong>
                {user.reasonsForJoining_findOpportunities}
                {user.reasonsForJoining_connectOthers}
                {user.reasonsForJoining_offerOpportunities}
                {user.reasonsForJoining_promoteServices}
              </span>
              <span>
                <strong>I am </strong>
                {user.typeOfUserSelection}
              </span>
              <span>
                <strong>Facebook</strong>
                {user.facebook}
              </span>
              <span>
                <strong>Instagram</strong>
                {user.instagram}
              </span>
              <span>
                <strong>Twitter</strong>
                {user.twitter}
              </span>
              <span>
                <strong>LinkedIn</strong>
                {user.linkedin}
              </span>
              <span>
                <strong>TikTok</strong>
                {user.tiktok}
              </span>
              <span>
                <strong>Spotify</strong>
                {user.spotify}
              </span>
              <span>
                <strong>SoundCloud</strong>
                {user.soundcloud}
              </span>
              <span>
                <strong>Apple Music</strong>
                {user.appleMusic}
              </span>
              <span>
                <strong>Amazon Music</strong>
                {user.amazonMusic}
              </span>
              <span>
                <strong>Deezer</strong>
                {user.deezer}
              </span>
              <span>
                <strong>Pandora</strong>
                {user.pandora}
              </span>
              <span>
                <strong>BandCamp</strong>
                {user.bandcamp}
              </span>
              <span>
                <strong>Interests</strong>
                {user.interests}
              </span>
              <span>
                <strong>Musical Skills</strong>
                {user.musicalSkills}
              </span>
              <span>
                <strong>Other Skills</strong>
                {user.otherSkills}
              </span>
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
