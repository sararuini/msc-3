import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import BandList from "./BandList";


const BAND_PROFILE_CONTENT= {
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
  }


class EditBand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...BAND_PROFILE_CONTENT
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.setState({loading: false });

  };

  componentWillUnmount = () => {
    this.props.firebase.bands().off();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 10 }),
      this.loadBands
    );
  };

  render() {
    const {loading } = this.state;
    const {authUser} = this.props;
    
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div> Edit
            </div>

        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(EditBand);
