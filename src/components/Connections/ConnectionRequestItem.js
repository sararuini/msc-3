import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class ConnectionRequestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      connectionRequestUsername: "",
    }
  }

  componentDidMount = () => {
    this.setState({loading: true})
    this.retrieveUsername()
    this.setState({loading: false})
  }

  retrieveUsername = () => {
    const thisConnectionRequest = this.props.connectionRequest.uid;
    console.log("thisConnection " + thisConnectionRequest)
    this.props.firebase.pendingConnection(thisConnectionRequest).once("value", (snapshot) => {
      const connectionRqstObj = snapshot.val();
      const receiver = connectionRqstObj.receiverId;
      const sender = connectionRqstObj.senderId;
      let selectedUser = "";

      if (this.props.firebase.auth.currentUser.uid === receiver) {
        selectedUser = sender;
      } else if (this.props.firebase.auth.currentUser.uid === sender) {
        selectedUser = receiver;
      }
      console.log("selected" + selectedUser)
      this.props.firebase.user(selectedUser).on("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        console.log("userUserna " + userUsername)
        this.setState({ connectionRequestUsername: userUsername });
      });
    });
  };

  render() {
    const { authUser, connectionRequest, acceptConnectionRequest, declineConnectionRequest} = this.props;
    const {connectionRequestUsername} = this.state;
    return ( 
      <div>
         { authUser.uid === connectionRequest.receiverId && (
         <span>
           <Link
                  to={{
                    pathname: `${ROUTES.USERS}/${connectionRequest.senderId}`,
                  }}
                > 
                  {connectionRequestUsername}
                </Link>
           <span> would like to connect with you </span>
           <button onClick={() => acceptConnectionRequest(connectionRequest.uid)}> Accept</button>
           <button onClick={() => declineConnectionRequest(connectionRequest.uid)}> Decline</button>
         </span>  
      )}
      </div>      
    );
  }
}

export default withFirebase(ConnectionRequestItem);