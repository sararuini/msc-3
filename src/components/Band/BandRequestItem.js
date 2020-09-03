import React, { Component } from "react";

import { Link } from "react-router-dom";

import bandStyle from "./styles";
import { View, Text } from "react-native-web";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class BandRequestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      roleRequest: "",
      username: "",
      userId: ""
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.loadUser()
    this.setState({ loading: false });
  };


  loadUser = () => {
    const user = this.props.user.uid
    this.setState({userId: user})
    const band = this.props.band
    console.log("user ---- Bandrequestitem " + user)

    this.props.firebase.bandMemberRequest(band, user).once("value", (snapshot) => {
      const userRequestObj = snapshot.val()
      console.log("roooole" + userRequestObj.userRole)
      if (userRequestObj) {
        this.setState({roleRequest: userRequestObj.userRole})
      } 
    })

    this.props.firebase.user(user).once("value", (snapshot) => {
      const userObj = snapshot.val()
      if(userObj){
        this.setState({username: userObj.username})
      }
    })
    
  }


  approveMembership  = () => {
    const user = this.props.user.uid
    const band = this.props.band

    this.props.firebase.bandMember(band, user).set({
      joinedAt: this.props.firebase.serverValue.TIMESTAMP,
      userRole: this.state.roleRequest,
    })

    this.props.firebase.notifications(user).push(
      {
        type: "Approved Band Member",
        band: band,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      }
    )

    this.props.firebase.bandMemberRequest(band, user).remove()

  }

  declineMembership = () => {
    const user = this.props.user.uid
    const band = this.props.band

    this.props.firebase.notifications(user).push(
      {
        type: "Declined Band Member",
        band: band,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      }
    )
    this.props.firebase.bandMemberRequest(band, user).remove()

  }

  componentWillUnmount() {
    const band = this.props.band.uid;
    this.props.firebase.bandMemberRequests(band).off();
  }

  render() {
    const {username, roleRequest, userId} = this.state

    return (
      <div>
        
          <ul>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${userId}`,
              }}
            >
               <Text style={bandStyle.normal_text}>

                  {username}
               </Text>
             
            </Link>
            <Text style={bandStyle.header}>Role requested: </Text>  <Text style={bandStyle.normal_text}> {roleRequest} </Text>
          </ul>
          <button
              onClick={() => this.approveMembership()}
            >
              <Text style={bandStyle.normal_text}>
              Accept Band Membership Request
              </Text>
            </button>
            <button
              onClick={() => this.declineMembership()}
            >
             <Text style={bandStyle.normal_text}>
              Delete Band Membership Request
              </Text>
            </button>
      </div>
    );
  }
}

export default withFirebase(BandRequestItem);
