import React, { Component } from "react";

import { Link } from "react-router-dom";
import connectionStyle from "./styles";
import { View, Text } from "react-native-web";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class ConnectionRequestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      senderUsername: "",
      receiverUsername: "",
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.retrieveUsername();
    this.setState({ loading: false });
  };

  retrieveUsername = () => {
    const thisConnectionRequest = this.props.connectionRequest.uid;
    console.log("thisConnection " + thisConnectionRequest);
    this.props.firebase
      .pendingConnection(thisConnectionRequest)
      .once("value", (snapshot) => {
        const connectionRqstObj = snapshot.val();
        const receiver = connectionRqstObj.receiverId;
        const sender = connectionRqstObj.senderId;

        this.props.firebase.user(receiver).on("value", (snapshot) => {
          const receiverUsername = snapshot.val().username;
          console.log("receiver usnm " + receiverUsername);
          this.setState({ receiverUsername: receiverUsername });
        });

        this.props.firebase.user(sender).on("value", (snapshot) => {
          const senderUsername = snapshot.val().username;
          console.log("sender Usnm " + senderUsername);
          this.setState({ senderUsername: senderUsername });
        });
      });
  };

  componentWillUnmount() {
    const rqst = this.props.connectionRequest.uid;
    this.props.firebase.pendingConnection(rqst).off()
  }


  render() {
    const {
      authUser,
      connectionRequest,
      acceptConnectionRequest,
      declineConnectionRequest,
      deleteConnectionRequest,
    } = this.props;
    const { senderUsername, receiverUsername } = this.state;
    return (
      <div>
        {authUser.uid === connectionRequest.receiverId && (
          <span>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${connectionRequest.senderId}`,
              }}
            >
              <Text style={connectionStyle.header}>
                {senderUsername}
              </Text>
              
            </Link>
            <Text style={connectionStyle.normal_text}> would like to connect with you </Text>
            <button
              onClick={() => acceptConnectionRequest(connectionRequest.uid)}
            >
              <Text style={connectionStyle.normal_text}>
              Accept Connection Request
              </Text>
            </button>
            <button
              onClick={() => declineConnectionRequest(connectionRequest.uid)}
            >
              <Text style={connectionStyle.normal_text}>
              Decline Connection Request
              </Text>
            </button>
          </span>
        )}

        {authUser.uid === connectionRequest.senderId && (
          <span>
            <Text style={connectionStyle.normal_text}>You sent a connection request to: </Text>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${connectionRequest.receiverId}`,
              }}
            >
              <Text style={connectionStyle.normal_text}>

              
              {receiverUsername}</Text>
            </Link>
            <button
              onClick={() => deleteConnectionRequest(connectionRequest.uid)}
            >
              <Text style={connectionStyle.normal_text}>
              Delete Connection Request
              </Text>
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(ConnectionRequestItem);
