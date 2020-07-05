import React, { Component, Row, Col} from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";

import { withFirebase } from "../Firebase";
import { Picker, CheckBox, View, Text} from "react-native-web";
import * as ROUTES from '../../constants/routes';
import page_styles from './styles';

//page displaying 'modify profile'
const ModifyProfilePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Text style={page_styles.text_h1}>Modify Profile: {authUser.username}</Text>
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
  
   this.props.firebase.auth.onAuthStateChanged(
     authUser => {
       if (authUser ) {
         this.props.firebase.user(authUser.uid)
    .update({
      location:location,
      headline:headline,
      phoneNumber:phoneNumber,
      publicEmailAddress:publicEmailAddress,
      website:website,
      biography:biography
    })
    .then( () => {
      this.setState({...PROFILE_CONTENT});
    })
      .catch(error => {
        this.setState({ error });
      });
       }
     }
   )
   
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
      <View style={page_styles.whole_page}>
      <div>
          
          {/* Profile picture here */}
          <form onSubmit={this.onSubmit}>
          <View style={page_styles.pic_section}>
          <Text styles={page_styles.text_h2}>Profile Picture</Text>
          <Text styles={page_styles.text_h3}>Headline</Text>
              <input
                type="text"
                id="headline"
                name="headline"
                value={headline}
                onChange={this.onChange}
                placeholder="Headline"
              />
            <Text styles={page_styles.text_h3}>Location</Text>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={this.onChange}
              placeholder="Location"
            />
            </View>
            <Text styles={page_styles.text_h3}>Biography</Text>
              <input
                type="textarea"
                id="biography"
                name="biography"
                value={biography}
                onChange={this.onChange}
                placeholder="Biography"
              />             
                <Text style={page_styles.text_h2}>Contact Details</Text>
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
                <View style={page_styles.checkboxes}>
                <Text style={page_styles.text_h2}> Why did you join music connector?</Text>
                <label htmlFor="music-connector-join">Why did you join Music Connector?</label>
                
                <input
                  type="checkbox"
                  name="connect-others"
                  id="connect-others"
                  value="onnect-others"
                />
                <label htmlFor="connect-others">Connect with others</label>
                <input
                  type="checkbox"
                  name="find-opportunities"
                  id="find-opportunities"
                  value="find-opportunities"
                />
                <label htmlFor="find-opportunities">Find new opportunities</label>
                </View>
                
                
                <View style={page_styles.picker}>
                <Picker>
                  <Picker.Item label="Music Industry Professional" />
                  <Picker.Item label="Musician" />
                  <Picker.Item label="Both" />
                  <Picker.Item label="Neither" />
                </Picker>
                </View>

                <View style={page_styles.save_button}>
                  <button type="submit">
                  Save Profile
                </button>
                </View>
                
              </form>
            </div>   
      </View>
    )
  }
}

const ModifyProfile = withFirebase(ModifyProfileBase);
const condition = (authUser) => !!authUser;
  
export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ModifyProfilePage);
  