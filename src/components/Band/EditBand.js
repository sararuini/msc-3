import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { View, Text } from "react-native-web";

import bandStyle from "./styles";
const BAND_PROFILE_CONTENT = {
  musicGenre: "",
  location: "",
  headline: "",
  phoneNumber: "",
  publicEmailAddress: "",
  website: "",
  biography: "",
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
  loading: false,
  error: null,
};

class EditBand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...BAND_PROFILE_CONTENT,
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.showBand()
    this.setState({ loading: false });
  };

  componentWillUnmount = () => {
    const bandUid = this.props.match.params.id;
    this.props.firebase.band(bandUid).off();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  showBand = () => {
    const bandUid = this.props.match.params.id;
    console.log("bandUid" + bandUid)
    const bandRef = this.props.firebase.band(bandUid);
    bandRef.on("value", (snapshot) => {
      this.setState({
        location: snapshot.val().location,
        musicGenre: snapshot.val().musicGenre,
        headline: snapshot.val().headline,
        phoneNumber: snapshot.val().phoneNumber,
        publicEmailAddress: snapshot.val().publicEmailAddress,
        website: snapshot.val().website,
        biography: snapshot.val().biography,
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
      });
    });
  };

  onSubmit = (event) => {
    const {
      musicGenre,
      location,
      headline,
      phoneNumber,
      publicEmailAddress,
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
    } = this.state;

    const bandUid = this.props.match.params.id;
    const bandRef = this.props.firebase.band(bandUid);
    const bandProfile = bandRef.push().key;

    const processUpdates = (bandProfile) => {
      const updates = {};

      if (bandRef.musicGenre !== musicGenre) {
        updates["musicGenre"] = musicGenre;
      }

      if (bandRef.location !== location) {
        updates["location"] = location;
      }

      if (bandRef.headline !== headline) {
        updates["headline"] = headline;
      }

      if (bandRef.website !== website) {
        updates["website"] = website;
      }

      if (bandRef.phoneNumber !== phoneNumber) {
        updates["phoneNumber"] = phoneNumber;
      }

      if (bandRef.publicEmailAddress !== publicEmailAddress) {
        updates["publicEmailAddress"] = publicEmailAddress;
      }

      if (bandRef.biography !== biography) {
        updates["biography"] = biography;
      }

      if (bandRef.facebook !== facebook) {
        updates["facebook"] = facebook;
      }
      if (bandRef.instagram !== instagram) {
        updates["instagram"] = instagram;
      }

      if (bandRef.twitter !== twitter) {
        updates["twitter"] = twitter;
      }
      if (bandRef.linkedin !== linkedin) {
        updates["linkedin"] = linkedin;
      }
      if (bandRef.tiktok !== tiktok) {
        updates["tiktok"] = tiktok;
      }
      if (bandRef.youtube !== youtube) {
        updates["youtube"] = youtube;
      }
      if (bandRef.spotify !== spotify) {
        updates["spotify"] = spotify;
      }
      if (bandRef.soundcloud !== soundcloud) {
        updates["soundcloud"] = soundcloud;
      }
      if (bandRef.appleMusic !== appleMusic) {
        updates["appleMusic"] = appleMusic;
      }

      if (bandRef.amazonMusic !== amazonMusic) {
        updates["amazonMusic"] = amazonMusic;
      }
      if (bandRef.deezer !== deezer) {
        updates["deezer"] = deezer;
      }
      if (bandRef.pandora !== pandora) {
        updates["pandora"] = pandora;
      }
      if (bandRef.bandcamp !== bandcamp) {
        updates["bandcamp"] = bandcamp;
      }

      return bandRef.update(updates);
    };

    processUpdates(bandProfile)
      .then(function (snapshot) {
        let data = snapshot.val();
      })
      .then(() => {
        this.setState({ ...BAND_PROFILE_CONTENT });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const {
      loading,
      musicGenre,
      location,
      headline,
      phoneNumber,
      publicEmailAddress,
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
      error,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <View>
            <Text style={bandStyle.header}>Headline</Text>
            <input
              type="text"
              id="headline"
              name="headline"
              value={headline}
              onChange={this.onChange}
              placeholder="Headline"
            />
            <Text style={bandStyle.header}>Music Genre</Text>
            <input
              type="text"
              id="musicGenre"
              name="musicGenre"
              value={musicGenre}
              onChange={this.onChange}
              placeholder="Music Genre"
            />
            <Text style={bandStyle.header}>Location</Text>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={this.onChange}
              placeholder="Location"
            />

            <Text style={bandStyle.header}>Biography</Text>
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
            <Text style={bandStyle.header}>Public Contact Details</Text>
            <label htmlFor="publicEmailAddress">Email Address</label>
            <input
              type="publicEmailAddress"
              value={publicEmailAddress}
              id="publicEmailAddress"
              name="publicEmailAddress"
              onChange={this.onChange}
              placeholder="Email Address"
            />

<Text style={bandStyle.header}>Phone Number</Text>
            <input
              name="phoneNumber"
              value={phoneNumber}
              type="tel"
              onChange={this.onChange}
              id="phone"
              placeholder="Phone Number"
            />

<Text style={bandStyle.header}>Personal Website</Text>
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
            <Text style={bandStyle.header}>Social Media and Music Profiles</Text>
            <Text style={bandStyle.header}>Facebook</Text>
            <input
              type="textarea"
              id="facebook"
              name="facebook"
              value={facebook}
              onChange={this.onChange}
              placeholder="Facebook"
            />
            <Text style={bandStyle.header}>Instagram</Text>
            <input
              type="textarea"
              id="instagram"
              name="instagram"
              value={instagram}
              onChange={this.onChange}
              placeholder="Instagram"
            />
            <Text style={bandStyle.header}>Twitter</Text>
            <input
              type="textarea"
              id="twitter"
              name="twitter"
              value={twitter}
              onChange={this.onChange}
              placeholder="twitter"
            />
            <Text style={bandStyle.header}>LinkedIn</Text>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={linkedin}
              onChange={this.onChange}
              placeholder="linkedin"
            />
            <Text style={bandStyle.header}>TikTok</Text>
            <input
              type="textarea"
              id="tiktok"
              name="tiktok"
              value={tiktok}
              onChange={this.onChange}
              placeholder="TikTok"
            />
            <Text style={bandStyle.header}> YouTube</Text>
            <input
              type="url"
              id="youtube"
              name="youtube"
              value={youtube}
              onChange={this.onChange}
              placeholder="YouTube"
            />
            <Text style={bandStyle.header}>Spotify</Text>
            <input
              type="url"
              id="spotify"
              name="spotify"
              value={spotify}
              onChange={this.onChange}
              placeholder="Spotify"
            />
            <Text style={bandStyle.header}>SoundCloud</Text>
            <input
              type="url"
              id="soundcloud"
              name="soundcloud"
              value={soundcloud}
              onChange={this.onChange}
              placeholder="SoundCloud"
            />
            <Text style={bandStyle.header}>Apple Music</Text>
            <input
              type="url"
              id="appleMusic"
              name="appleMusic"
              value={appleMusic}
              onChange={this.onChange}
              placeholder="Apple Music"
            />
            <Text style={bandStyle.header}>Amazon Music</Text>
            <input
              type="url"
              id="amazonMusic"
              name="amazonMusic"
              value={amazonMusic}
              onChange={this.onChange}
              placeholder="Amazon Music"
            />
            <Text style={bandStyle.header}>Deezer</Text>
            <input
              type="url"
              id="deezer"
              name="deezer"
              value={deezer}
              onChange={this.onChange}
              placeholder="Deezer"
            />
            <Text style={bandStyle.header}>Pandora</Text>
            <input
              type="textarea"
              id="pandora"
              name="pandora"
              value={pandora}
              onChange={this.onChange}
              placeholder="Pandora"
            />
            <Text style={bandStyle.header}>BandCamp</Text>
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
            <button type="submit"><Text style={bandStyle.header}>Save Profile</Text></button>
          </View>
        </form>
      </div>
    );
  }
}

export default withFirebase(EditBand);
