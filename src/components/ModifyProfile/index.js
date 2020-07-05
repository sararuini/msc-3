import React, { Component, Row, Col} from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";

import { withFirebase } from "../Firebase";
import { Picker } from "react-native-web";
import * as ROUTES from '../../constants/routes';

//page displaying 'modify profile'
const ModifyProfilePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Modify Profile: {authUser.username}</h1>
        <ModifyProfile authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
)

const PROFILE_CONTENT = {
  location: '',
  headline: '',
  phoneNumber: '',
  publicEmailAddress: '',
  website:'',
  biography: '',
  error: null,
}

class ModifyProfileBase extends Component {
  constructor(props) {
    super(props);
  
    this.state = { ...PROFILE_CONTENT};
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }); 
  };
  
  
  onSubmit = (event) => {
    const {
      location,
      headline,
      phoneNumber,
      publicEmailAddress,
      website,
      biography, 
   } = this.state;

   this.props.firebase.user()
    .set({
      location:location,
      headline:headline,
      phoneNumber:phoneNumber,
      publicEmailAddress:publicEmailAddress,
      website:website,
      biography:biography
    })
    .then(() => {
      this.setState({...PROFILE_CONTENT});
      this.props.history.push(ROUTES.HOME);
    })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();

  };
  
  render() {
    const {
      location,
      headline,
      phoneNumber,
      emailAddress,
      website,
      biography,
      error
    } = this.state;
    
    return (
      <div>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="headline">Headline</label>
              <input
                type="text"
                id="headline"
                name="headline"
                value={headline}
                onChange={this.onChange}
                placeholder="Headline"
              />
            <label htmlFor="location">Current Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={this.onChange}
              placeholder="Location"
            />
            <label htmlFor="biography">Biography</label>
              <input
                type="textarea"
                id="biography"
                name="biography"
                value={biography}
                onChange={this.onChange}
                placeholder="Biography"
              />              
                <h3>Contact Details</h3>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  value={emailAddress}
                  id="email"
                  name="email"
                  onChange={this.onChange}
                  placeholder="Email Address"
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={phoneNumber}
                  type="tel"
                  onChange={this.onChange}
                  id="phone"
                  placeholder="Phone Number"
                />

                <label htmlFor="website">Personal Website</label>
                <input
                  name="website"
                  value={website}
                  type="url"
                  onChange={this.onChange}
                  id="website"
                  placeholder="Website"
                />
                <button type="submit">
                  Save Profile
                </button>
              </form>
            </div>
    )
  }
}
const ModifyProfile = withFirebase(ModifyProfileBase);
const condition = (authUser) => !!authUser;
  
export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ModifyProfilePage);
  