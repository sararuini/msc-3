import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class BandMemberItem extends Component {
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
              {senderUsername}
            </Link>
            <span> would like to connect with you </span>
            <button
              onClick={() => acceptConnectionRequest(connectionRequest.uid)}
            >
              {" "}
              Accept Connection Request
            </button>
            <button
              onClick={() => declineConnectionRequest(connectionRequest.uid)}
            >
              {" "}
              Decline Connection Request
            </button>
          </span>
        )}

        {authUser.uid === connectionRequest.senderId && (
          <span>
            <span> You sent a connection request to: </span>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${connectionRequest.receiverId}`,
              }}
            >
              {receiverUsername}
            </Link>
            <button
              onClick={() => deleteConnectionRequest(connectionRequest.uid)}
            >
              {" "}
              Delete Connection Request
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(ConnectionRequestItem);
