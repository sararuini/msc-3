import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import ConnectionRequestList from "./ConnectionRequestList";

class ConnectionRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionRequests: [],
      connectionUser: "",
      currentUser: "",
      limit: 5,
      loading: false,
    };
  }

  listenForConnectionRequests = () => {
    this.setState({ loading: true });
    console.log("loading your connection rqst")
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase
          .pendingConnections()
          .orderByChild("createdAt")
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const requestObject = snapshot.val();

            if (requestObject) {
              console.log(requestObject);
              const connectionRequestList = Object.keys(requestObject).map(
                (key) => ({
                  ...requestObject[key],
                  uid: key,
                })
              );

              this.setState({
                connectionRequests: connectionRequestList,
                loading: false,
              });
            } else {
              this.setState({ connectionRequests: null, loading: false });
            }
          });
      }
    });
  };

  componentDidMount = () => {
    this.listenForConnectionRequests();
  };

  
  componentWillUnmount = () => {
    this.props.firebase.pendingConnections().off();
  }

  acceptConnectionRequest = (uid) => {
    console.log("accept 1 ");

    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase.pendingConnection(uid).once("value", (snapshot) => {
          const sender = snapshot.val().senderId;
          console.log("sender " + sender);
          this.setState({ connectionUser: sender });

          const reference = this.props.firebase.connections().push({
            userA: this.state.connectionUser,
            userB: currentUserId,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
          });

          const refKey = reference.key;

          console.log("ref key " + refKey);

          this.props.firebase.userConnection(currentUserId, refKey).set({
            user: this.state.connectionUser,
            state: true,
          })
          console.log("oh ye")

          this.props.firebase.userConnection(this.state.connectionUser, refKey).set({
            user: currentUserId,
            state: true,
          })

          console.log("finito");
        });

        this.props.firebase.pendingConnection(uid).remove();
        console.log("acrtually finito");
      }
    });
  };

  declineConnectionRequest = (uid) => {
    console.log("uid " + uid);
    this.props.firebase.pendingConnection(uid).remove();
    
  };

  deleteConnectionRequest = (uid) => {
    console.log("deleted connection requests")
    console.log("uid " + uid);
    this.props.firebase.pendingConnection(uid).remove();
  }

  onNextPage = () => {
      this.setState(
        (state) => ({ limit: state.limit + 5 }),
        this.listenForConnectionRequests
      );
  };

  render() {
    const { connectionRequests, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            {connectionRequests && (
              <ConnectionRequestList
                authUser={authUser}
                connectionRequests={connectionRequests}
                acceptConnectionRequest={this.acceptConnectionRequest}
                declineConnectionRequest={this.declineConnectionRequest}
                deleteConnectionRequest={this.deleteConnectionRequest}

              />
            )}

            {!loading && connectionRequests && connectionRequests.length > 5 && (
              <button type="button" onClick={this.onNextPage}>
                View more connection requests
              </button>
            )}

            {!connectionRequests && (
              <div>There are no pending connection requests ...</div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ConnectionRequests);
