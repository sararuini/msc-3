import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class ConnectionRequestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }
ìì
  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span> 
            <span>
              <strong>Location</strong>{user.location}
            </span>
            <span>
              <strong>Headline</strong>{user.headline}
            </span>
            <span>
              <strong>Phone Number</strong>{user.phoneNumber}
            </span>
            <span>
              <strong>Email</strong>{user.publicEmailAddress}
            </span>
            <span>
              <strong>Website</strong>{user.website}
            </span>
            <span>
              <strong>Biography</strong>{user.biography}
            </span>
            <span>
              <strong>Reasons for Joining</strong>{user.reasonsForJoining_findOpportunities}
              {user.reasonsForJoining_connectOthers}
              {user.reasonsForJoining_offerOpportunities}
              {user.reasonsForJoining_promoteServices}
            </span>
            <span>
              <strong>I am </strong>{user.typeOfUserSelection}
            </span>
            <span>
              <strong>Facebook</strong>{user.facebook}
            </span>
            <span>
              <strong>Instagram</strong>{user.instagram}
            </span>
            <span>
              <strong>Twitter</strong>{user.twitter}
            </span>
            <span>
              <strong>LinkedIn</strong>{user.linkedin}
            </span>
            <span>
              <strong>TikTok</strong>{user.tiktok}
            </span>
            <span>
              <strong>Spotify</strong>{user.spotify}
            </span>
            <span>
              <strong>SoundCloud</strong>{user.soundcloud}
            </span>
            <span>
              <strong>Apple Music</strong>{user.appleMusic}
            </span>
            <span>
              <strong>Amazon Music</strong>{user.amazonMusic}
            </span>
            <span>
              <strong>Deezer</strong>{user.deezer}
            </span>
            <span>
              <strong>Pandora</strong>{user.pandora}
            </span>
            <span>
              <strong>BandCamp</strong>{user.bandcamp}
            </span>
            <span>
              <strong>Interests</strong>{user.interests}
            </span>
            <span>
              <strong>Musical Skills</strong>{user.musicalSkills}
            </span>
            <span>
              <strong>Other Skills</strong>{user.otherSkills}
            </span>
            <span>
              <strong>Portfolio Items</strong>{user.portfolioItems}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(ConnectionRequestItem);