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
      requestSent: false,
      existingFriendship: false,
      timestamp: "",
      isHidden: true,
      ...props.location.state,
    };
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const receiverId = this.props.match.params.id;
        const currentSenderId = currentUser.uid;

        this.props.firebase.userConnections(currentSenderId).once("value").then((snapshot)=> {
          const connectionObj = snapshot.val();
          console.log("connection obj" +connectionObj)
          if (connectionObj) {
            for (const connectionObjId in connectionObj) {
              if (connectionObj.hasOwnProperty(connectionObjId)) {
                console.log("connection id " +  connectionObjId)
                const connection = connectionObj[connectionObjId]
                const connectedUser = connection.user;

                console.log("connected user " +connectedUser)
                if (receiverId === connectedUser) {
                  this.setState({existingFriendship: true})
                }
              }
            }
          } else {
            this.setState({requestSent:false})
          }
        })
      }
    });

    this.loadUser();
  }
  loadUser = () => {
    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", (snapshot) => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }
  /*
  componentDidUpdate(prevProps, prevState) {
    if(prevState.requestSent !== this.state.requestSent) {
      this.fetchData(prevState.requestSent);
    }
  }
  */

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  sendConnectionRequest = () => {
    const receiverId = this.props.match.params.id;
    const sender = this.props.firebase.auth.currentUser;
    const senderId = sender.uid;
    const newRef = this.props.firebase.pendingConnections().push();
    const newRefKey = newRef.key;

    if (this.state.requestSent === false) {
      newRef.set({
        senderId: senderId,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
        receiverId: receiverId,
      });

      this.setState({ previousKey: newRefKey, requestSent: true });

      /*
      this.props.firebase.userPendingConnections(receiverId, newRefKey).set({
        senderId: senderId,
        createdAt: this.state.timestamp,
        receiverId: receiverId,
      })

      this.props.firebase.userPendingConnections(senderId, newRefKey).set({
        senderId: senderId,
        createdAt: this.state.timestamp,
        receiverId: receiverId,
      })
      */

      console.log("request sent");
      console.log(newRefKey);
    }
  };

  removeConnectionRequest() {
    const receiverId = this.props.match.params.id;
    const sender = this.props.firebase.auth.currentUser;
    const senderId = sender.uid;

    const refKey = this.state.previousKey;
    console.log(refKey);
    this.props.firebase.pendingConnection(refKey).remove();
    //this.props.firebase.userPendingConnection(receiverId, refKey);
    //this.props.firebase.userPendingConnection(senderId, refKey);
    this.setState({ requestSent: false });
    console.log("request removed");
  }

  render() {
    const { user, loading, isHidden, requestSent, existingFriendship} = this.state;

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

        {!isHidden && requestSent === true && existingFriendship === false && (
          <span>
            <button
              onClick={() => {
                this.removeConnectionRequest();
                this.toggleHidden();
              }}
            >
              Remove Connection Request
            </button>
          </span>
        )}

        {isHidden && requestSent == false && existingFriendship === false && (
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
                  this.toggleHidden();
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
