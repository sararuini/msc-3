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
      senderId: null,
      senderUsername: null,
      isHidden: true,
      ...props.location.state,
    };
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  componentDidMount () {
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

      {/* const senderUser = this.props.firebase.auth.currentUser;
    const senderId = senderUser.uid;
    const receiverId = this.props.match.params.id;
    let requestObj = null;

    this.props.firebase
      .connectionRequests(receiverId)
      .on("value", function (snapshot) {
        requestObj = snapshot.val().requestSent;
      });
      console.log("request obj" + requestObj)

      if (requestObj === true) {
        this.setState({hideButton: true})
      } */}

  };

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  sendConnectionRequest = () => {
    const receiverId = this.props.match.params.id;
    const sender = this.props.firebase.auth.currentUser;
    const senderId = sender.uid;

    console.log(" Sender Id " + senderId)
    console.log("Receiver id: " + receiverId)

    const connectionRequestSent = this.props.firebase.connectionRequests(
      receiverId
    );
    connectionRequestSent.push({ requestSent: true, senderId: senderId});
  };

  removeConnectionRequest = () => {
    const receiverId = this.props.match.params.id;

    const connectionUnsent = this.props.firebase.connectionRequests(
      receiverId
    );
    connectionUnsent.remove();
  };

  render() {
    const { user, loading, isHidden} = this.state;
    const { authUser } = this.props;

    return (
      <div>
        <h2>User ({user.username})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <View style={page_styles_template.main_page}>
            <div>
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

        {!isHidden ? (
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
        ) : (
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
