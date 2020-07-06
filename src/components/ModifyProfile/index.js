import React, { Component, Row, Col } from "react";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";

import { withFirebase } from "../Firebase";
import { View, Text } from "react-native-web";
import * as ROUTES from "../../constants/routes";
import page_styles from "./styles";

//page displaying 'modify profile'
const ModifyProfilePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Text style={page_styles.text_h1}>
          Modify Profile: {authUser.username}
        </Text>
        <ModifyProfile authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const PROFILE_CONTENT = {
  profilePicture: "",
  location: "",
  headline: "",
  phoneNumber: "",
  publicEmailAddress: "",
  website: "",
  biography: "",
  reasonsForJoining_findOpportunities: false,
  reasonsForJoining_connectOthers: false,
  reasonsForJoining_offerOpportunities: false,
  reasonsForJoining_promoteServices: false,
  typeOfUserSelection: "",
  portfolioItems: [],
  error: null,
};

class ModifyProfileBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...PROFILE_CONTENT };
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onSubmit = (event) => {
    const {
      profilePicture,
      location,
      headline,
      phoneNumber,
      publicEmailAddress,
      website,
      reasonsForJoining_findOpportunities,
      reasonsForJoining_connectOthers,
      reasonsForJoining_offerOpportunities,
      reasonsForJoining_promoteServices,
      typeOfUserSelection,
      biography,
    } = this.state;

    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const user = this.props.firebase.user(authUser.uid);
        let newPost = user.push().key;

        const processUpdates = (newPost) => {
          const updates = {};
          if (user.location !== location) {
            updates["location"] = location;
          }
          
          if (user.headline !== headline) {
            updates["headline"] = headline;
          }

          if (user.phoneNumber !== phoneNumber) {
            updates["phoneNumber"] = phoneNumber;
          } 

          if (user.publicEmailAddress !== publicEmailAddress) {
            updates["publicEmailAddress"] = publicEmailAddress;
          }

          if (user.reasonsForJoining_findOpportunities !== reasonsForJoining_findOpportunities) {
            updates["reasonsForJoining_findOpportunities"] = reasonsForJoining_findOpportunities;
          }

          if (user.reasonsForJoining_connectOthers !== reasonsForJoining_connectOthers) {
            updates["reasonsForJoining_connectOthers"] = reasonsForJoining_connectOthers;
          }
          
          if (user.reasonsForJoining_offerOpportunities !== reasonsForJoining_offerOpportunities) {
            updates["reasonsForJoining_offerOpportunities"] = reasonsForJoining_offerOpportunities;
          }
          
          if (user.reasonsForJoining_promoteServices !== reasonsForJoining_promoteServices) {
            updates["reasonsForJoining_promoteServices"] = reasonsForJoining_promoteServices;
          }
          
          if (user.typeOfUserSelection !== typeOfUserSelection) {
            updates["typeOfUserSelection"] = typeOfUserSelection;
          }
          
          if (user.biography !== biography) {
            updates["biography"] = biography;
          }

          return user.update(updates);
        };

        processUpdates(newPost)
          .then(() => {
            this.setState({ ...PROFILE_CONTENT });
          })
          .catch((error) => {
            this.setState({ error });
          });
      }
    });

    event.preventDefault();
  };

  render() {
    const {
      profilePicture,
      location,
      headline,
      phoneNumber,
      publicEmailAddress,
      reasonsForJoining_findOpportunities,
      reasonsForJoining_connectOthers,
      reasonsForJoining_offerOpportunities,
      reasonsForJoining_promoteServices,
      typeOfUserSelection,
      website,
      biography,
      error,
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
            <Text style={page_styles.text_h2}>Public Contact Details</Text>
            <label htmlFor="publicEmailAddress">Email Address</label>
            <input
              type="publicEmailAddress"
              value={publicEmailAddress}
              id="publicEmailAddress"
              name="publicEmailAddress"
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
            <View style={page_styles.section}>
              <View style={page_styles.checkbox}>
                <Text style={page_styles.text_h2}>
                  {" "}
                  Why did you join music connector?
                </Text>

                <View style={page_styles.checkboxRow}>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_connectOthers"
                    id="reasonsForJoining_connectOthers"
                    checked={reasonsForJoining_connectOthers}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_connectOthers">
                    <Text styles={page_styles.text_h3}>
                      Connect with others
                    </Text>
                  </label>
                </View>

                <View style={page_styles.checkboxRow}>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_findOpportunities"
                    id="reasonsForJoining_findOpportunities"
                    checked={reasonsForJoining_findOpportunities}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_findOpportunities">
                    <Text styles={page_styles.text_h3}>
                      Find new opportunities
                    </Text>
                  </label>
                </View>

                <View style={page_styles.checkboxRow}>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_promoteServices"
                    id="reasonsForJoining_promoteServices"
                    checked={reasonsForJoining_promoteServices}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_promoteServices">
                    <Text styles={page_styles.text_h3}>
                      Promote my Services and/or my work
                    </Text>
                  </label>
                </View>

                <View style={page_styles.checkboxRow}>
                  <input
                    type="checkbox"
                    name="reasonsForJoining_offerOpportunities"
                    id="reasonsForJoining_offerOpportunities"
                    checked={reasonsForJoining_offerOpportunities}
                    onChange={this.onChangeCheckbox}
                  />
                  <label htmlFor="reasonsForJoining_offerOpportunities">
                    <Text styles={page_styles.text_h3}>
                      Offer Opportunities
                    </Text>
                  </label>
                </View>
              </View>
            </View>
            
            {/* <View style={page_styles.picker}>
              <label>
                <Text styles={page_styles.text_h2}>Are you a ...</Text>

                <select value={typeOfUserSelection} onChange={this.onChange}>
                  <option value="professional" onChange={this.onChange}>
                    Music Industry Professional
                  </option>
                  <option value="musician" onChange={this.onChange}>Musician</option>
                  <option value="musician-professional" onChange={this.onChange}>Both</option>
                  <option value="other" onChange={this.onChange}>Other</option>
                </select>
              </label>
            </View> */}

            <View style={page_styles.save_button}>
              <button type="submit">Save Profile</button>
            </View>
          </form>
        </div>
      </View>
    );
  }
}

const ModifyProfile = withFirebase(ModifyProfileBase);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ModifyProfilePage);
