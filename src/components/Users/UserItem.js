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
      connectionSentId: null,
      requestSent: false,
      previousKey: null,
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
    this.checkPendingRequests();
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
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  checkPendingRequests = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const sender = this.props.firebase.auth.currentUser;
        const receiverId = this.props.match.params.id;
        const currentSenderId = sender.uid;
        let receiverIdChecker = null;

        this.props.firebase
          .userPendingConnections(currentSenderId)
          .on("value", function (snapshot) {
            const requestObj = snapshot.val();
            if (requestObj){
              receiverIdChecker = requestObj.receiverId;
            }
          });

        if (receiverIdChecker === receiverId) {
          this.setState({ requestSent: true });
        } else {
          this.setState({requestSent: false})
        }
      }
    });
  };

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

      this.props.firebase.userPendingConnections(receiverId).push({
        senderId: senderId,
      });

      this.props.firebase.userPendingConnections(senderId).push({
        receiverId: receiverId,
      });

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
    this.props.firebase.userPendingConnections(receiverId).remove();
    this.props.firebase.userPendingConnections(senderId).remove();
    this.setState({ requestSent: false });
    console.log("request removed");
  }

  render() {
    const { user, loading, isHidden, requestSent, previousKey } = this.state;

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

        {!isHidden && requestSent === true && (
          <span>
            <button
              onClick={() => {
                {
                  /* if (this.checkPendingRequests() === true){ */
                }
                this.removeConnectionRequest();
                this.toggleHidden();
                {
                  /* } */
                }
              }}
            >
              Remove Connection Request
            </button>
          </span>
        )}

        {isHidden && requestSent == false && (
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
                  {
                    /*if (this.checkPendingRequests() === false) { */
                  }
                  this.sendConnectionRequest();
                  this.toggleHidden();
                  {
                    /* }  */
                  }
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
